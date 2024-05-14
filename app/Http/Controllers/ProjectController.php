<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Project::query()
                ->with(['creator', 'updater'])
                ->orderBy(request("sortBy", "created_at"), request("order", "desc"));

        if(request("name"))
            $query->where("name", "like", "%".request("name")."%");

        if(request("status"))
            $query->where("status", request("status"));

        $projects = $query->paginate(10)->onEachSide(1);

        return Inertia::render('Project/Index', [
            'projects' => ProjectResource::collection($projects),
            'queryParams' => request()->query() ?: null,
        ])->with('toasted', session('toasted'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Project/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = auth()->id();
        $data['updated_by'] = auth()->id();
        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('projects');
        }
        $project = Project::create($data);

        return to_route('project.show', $project)->with('toasted', ["type"=>'success',"message"=>"Project \"$project->name\" created successfully"]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $query = $project->tasks()
                    ->orderBy(request("sortBy", "created_at"), request("order", "desc"))
                    ->with(['creator', 'updater', 'assignee']);

        if(request("name"))
            $query->where("name", "like", "%".request("name")."%");

        if(request("status"))
            $query->where("status", request("status"));

        $tasks = $query->paginate(10)->onEachSide(1);

        return Inertia::render('Project/Show', [
            'project' => new ProjectResource($project->load('creator', 'updater','tasks','tasks.creator','tasks.updater','tasks.assignee')),
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
        ])->with('toasted', session('toasted'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return Inertia::render('Project/Edit', [
            'project' => new ProjectResource($project),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data = $request->validated();
        $data['updated_by'] = auth()->id();
        if ($request->hasFile('image')) {
            $data['image_path'] = $project->saveImage($request->file('image'));
        }
        $project->update($data);


        return to_route('project.show', $project)->with('toasted', ["type"=>'success',"message"=>"Project \"$project->name\" updated successfully"]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $project->delete();
        $project->deleteImage();

        return to_route('project.index')->with('toasted', ["type" => 'success', "message"=>"Project \"$project->name\" deleted successfully"]);
    }
}
