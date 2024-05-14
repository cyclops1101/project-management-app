<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query()
                ->orderBy(request("sortBy", "created_at"), request("order", "desc"));

        if(request("name"))
            $query->where("name", "like", "%".request("name")."%");

        if(request("email"))
            $query->where("email", request("email"));

        $users = $query->paginate(10)->onEachSide(1);

        return Inertia::render('User/Index', [
            'users' => UserResource::collection($users),
            'queryParams' => request()->query() ?: null,
        ])->with('toasted', session('toasted'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('User/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $user = User::create($data);

        return redirect()->route('user.show', $user)->with('toasted', ['type'=>'success','message'=>"User \"{$user->name}\" created successfully."]);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $query = $user->tasks()->orderBy(request("sortBy", "created_at"), request("order", "desc"))->with(['creator']);

        if(request("name"))
            $query->where("name", "like", "%".request("name")."%");

        if(request("status"))
            $query->where("status", request("status"));

            $tasks = $query->paginate(10)->onEachSide(1);
        return Inertia::render('User/Show', [
            'user' => new UserResource($user),
            'tasks'=> TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('User/Edit', [
            'user' => new UserResource($user),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        $user->update($data);

        return redirect()->route('user.show', $user)->with('toasted', ['type'=>'success','message'=>"User \"{$user->name}\" updated successfully."]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('user.index')->with('toasted', ['type'=>'success','message'=>"User \"{$user->name}\" deleted successfully."]);
    }
}
