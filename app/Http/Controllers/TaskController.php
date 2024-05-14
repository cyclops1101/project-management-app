<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::query()
        ->orderBy(request('sortBy', 'created_at'), request('order', 'desc'))
        ->with(['project', 'creator', 'updater', 'assignee']);

        if (request('name')){
            $query->where('name', 'like', '%' . request('name') . '%');
        }
        if (request('status')) {
            $query->where('status', request('status'));
        }
        if (request('priority')) {
            $query->where('priority', request('priority'));
        }
        if (request('project_id')) {
            $query->where('project_id', request('project_id'));
        }

        $tasks = $query->paginate(10)->onEachSide(1);

        return inertia('Task/Index', [
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Task/Create',
            [
                'project' => Project::find(request('project'))->only('id', 'name'),
                'users' => User::select('id','name')->get()
            ]
            );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = auth()->id();
        $data['updated_by'] = auth()->id();
        if($request->hasFile('image')){
            $data['image_path'] = $request->file('image')->store('tasks', 'public');
        }
        $task = Task::create($data);

        return redirect()->to(request('redirect') ?? route('task.show', $task))->with('toasted', ['type' => 'success', 'message' => "Task \"$task->name\" created successfully"]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return inertia('Task/Show', [
            'task' => new TaskResource($task->load(['project', 'creator', 'updater', 'assignee']))
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        return inertia('Task/Edit', [
            'task' => new TaskResource($task->load(['project', 'creator', 'updater'])),
            'users' => User::select('id', 'name')->get()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $data['updated_by'] = auth()->id();
        $task->update($data);

        return redirect()->to($request->input('redirect') ?? route('task.show', $task))->with('toasted', ['type' => 'success', 'message' => "Task \"$task->name\" updated successfully"]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Task $task)
    {
        $task->delete();

        return redirect()->to($request->input('redirect', route('task.index')))->with('toasted', ['type' => 'success', 'message' => "Task \"$task->name\" deleted successfully"]);
    }
}
