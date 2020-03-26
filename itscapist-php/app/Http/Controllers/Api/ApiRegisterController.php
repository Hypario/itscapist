<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;

class ApiRegisterController extends RegisterController
{

    /**
     * Store a newly created user
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        return $this->register($request);
    }

    /**
     * Handle a registration request for the application.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        // validate
        $validator = $this->validator($request->all());
        if ($validator->fails()) {
            return response()->json([
                "message" => $validator->getMessageBag(),
                "success" => false
            ], 401);
        }

        event(new Registered($user = $this->create($request->all()))); // create user

        return $this->registered($request, $user); // return message
    }

    /**
     * @param Request $request
     * @param mixed $user
     * @return \Illuminate\Http\JsonResponse
     */
    protected function registered(Request $request, $user)
    {
        return response()->json([
            "message" => "Successfully registered",
            "success" => true
        ], 200);
    }

}
