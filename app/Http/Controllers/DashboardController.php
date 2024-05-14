<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $totalPendingTasks = Task::query()
            ->where('status', 'pending')
            ->count();
        $myPendingTasks = Task::query()
            ->where('status', 'pending')
            ->where('assigned_to', $user->id)
            ->count();


        $totalProgressTasks = Task::query()
            ->where('status', 'in_progress')
            ->count();
        $myProgressTasks = Task::query()
            ->where('status', 'in_progress')
            ->where('assigned_to', $user->id)
            ->count();


        $totalCompletedTasks = Task::query()
            ->where('status', 'completed')
            ->count();
        $myCompletedTasks = Task::query()
            ->where('status', 'completed')
            ->where('assigned_to', $user->id)
            ->count();

        $activeTasks = Task::query()
            ->with(['creator'])
            ->whereIn('status', ['pending', 'in_progress'])
            ->where('assigned_to', $user->id)
            ->paginate(5)
            ->onEachSide(1);
        $activeTasks = TaskResource::collection($activeTasks);
        $queryParameters = request()->query();
        return inertia(
            'Dashboard',
            compact(
                'totalPendingTasks',
                'myPendingTasks',
                'totalProgressTasks',
                'myProgressTasks',
                'totalCompletedTasks',
                'myCompletedTasks',
                'activeTasks',
                'queryParameters'
            )
        );
    }
}