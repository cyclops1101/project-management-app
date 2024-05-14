<?php

namespace App\Traits;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

trait HasImage
{
    public function getImageUrl() : String | null
    {
        return $this->image_path ? (strpos($this->image_path, 'http') === 0 ? $this->image_path : asset("storage/" . $this->image_path)) : null;
    }

    public function deleteImage()
    {
        if(Storage::disk('public')->exists($this->image_path))
            Storage::disk('public')->delete($this->image_path);
    }

    public function saveImage(UploadedFile $image): String
    {
        $this->deleteImage();
        return $image->store('images/'.Str::lower(class_basename($this::class)), 'public');
    }
}