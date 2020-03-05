<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
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

}
