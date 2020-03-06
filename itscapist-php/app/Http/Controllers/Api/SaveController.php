<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Modeles\Save;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use JWTAuth;

class SaveController extends Controller
{

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function get()
    {
        $user = JWTAuth::user();

        /** @var Collection $saves */
        $saves = $user->getSave();

        return response()->json([
            "save" => $saves->has(0) ?: null
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

        if ($user->save_id) {
            /** @var Model $save */
            $save = Save::find($user->save_id);
            $save->update($validated);
        } else {
            $save = new Save($validated);
            $save->save();

            $user->save_id = $save->id;
            $user->save();
        }

        return response()->json([
            "messsage" => "Sucessfully saved",
            "errors" => null
        ]);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function delete()
    {
        $user = JWTAuth::user();

        $save = Save::find($user->save_id);
        $save->delete();

        return response()->json([
            "message" => "Sucessfully deleted",
            "errors" => null
        ]);
    }

}
