<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use JWTAuth;

class SaveController extends Controller
{

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function get()
    {
        $user = JWTAuth::user();
        $save = null;

        if ($save = $user->getSave()->get()->get(0)) {
            $save = $save->toJson();
        }

        return response()->json([
            "save" => $save
        ]);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $validated = $this->validate($request, [
            'map_id' => 'required|Integer',
            'inventory' => 'required|json',
            'health' => 'required|Integer|between:1,100'
        ]);

        $user = JWTAuth::user();

        $user->getSave()->updateOrCreate([], $validated);

        return response()->json([
            "messsage" => "Sucessfully saved",
            "success" => true
        ]);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function delete()
    {
        $user = JWTAuth::user();

        $user->getSave()->delete();

        return response()->json([
            "message" => "Sucessfully deleted",
            "success" => true
        ]);
    }

}
