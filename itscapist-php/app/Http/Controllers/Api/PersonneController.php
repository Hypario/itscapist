<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegistrationFormRequest;
use App\Http\Resources\PersonneResource;
use App\Modeles\Personne;
use App\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class PersonneController extends Controller {
    protected $data = [];

    /**
     * PersonneController constructor.
     */
    public function __construct() {
        $this->data = [
            'status' => false,
            'code' => 401,
            'data' => null,
            'err' => [
                'code' => 1,
                'message' => 'Unauthorized'
            ]
        ];
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index() {
        $personnes = Personne::all();
        $this->data['status'] = true;
        $this->data['code'] = 200;
        $this->data['data'] = PersonneResource::collection($personnes);
        $this->data['err'] = null;
        return response()->json($this->data, $this->data['code']);

    }

    /**
     * Store a newly created resource in storage.
     *
     */
    public function store(RegistrationFormRequest $request) {
        try {
            DB::transaction(function () use ($request) {
                $user = factory(User::class)->create([
                    'name' => $request->prenom . ' ' . $request->nom,
                    'email' => $request->email,
                    'password' => bcrypt($request->password),
                ]);
                $personne = factory(Personne::class)->create([
                    'nom' => $request->nom,
                    'prenom' => $request->prenom,
                    'actif' => $request->get('actif', true),
                    'cv' => $request->get('cv', 'to complete'),
                    'specialite' => $request->get('specialite', 'Polyvalent'),
                    'avatar' => 'avatars/anonymous.png',
                    'user_id' => $user->id,
                ]);
                $path = null;
                if ($request->hasFile('avatar')) {
                    $path = $request->file('avatar')->storeAs('avatars', 'avatar_de_' . $personne->id . '.' . $request->file('avatar')->extension(), 'public');
                    $personne->avatar = $path;
                    $personne->save();
                }
            });
        } catch (Exception $e) {
            $this->data['status'] = false;
            $this->data['code'] = 422;
            $this->data['data'] = null;
            $this->data['err'] = [
                'code' => 1,
                'message' => $e->getMessage(),
            ];
            return response()->json($this->data, $this->data['code']);
        }
        $personne = Personne::select(['personnes.*', 'users.id', 'users.email'])->join('users', 'users.id', '=', 'personnes.user_id')->where('users.email', $request->email)->first();
        $this->data['status'] = true;
        $this->data['code'] = 200;
        $this->data['data'] = new PersonneResource($personne);
        $this->data['err'] = null;
        return response()->json($this->data, $this->data['code']);
    }

    public function update(Request $request, $id) {
        $personne = Personne::find($id);
        if (!$personne) {
            $this->data['status'] = false;
            $this->data['code'] = 422;
            $this->data['data'] = null;
            $this->data['err'] = [
                'code' => 1,
                'message' => sprintf('La personne avec l\'id : %d n\'est pas dans la base', $id),
            ];
            return response()->json($this->data, $this->data['code']);
        }
        $user = $personne->user;
        if ($request->has('email') && $personne->user->email != $request->email) {
            $validator = Validator::make($request->all(),
                [
                    'nom' => 'required|string',
                    'prenom' => 'required|string',
                    'email' => ['required', 'email', Rule::unique('users')->ignore($user)],
                ]);
            if ($validator->fails()) {
                $this->data['code'] = 422;
                $this->data['err'] = [
                    'code' => 1,
                    'message' => $validator->errors(),
                ];
                return response()->json($this->data, $this->data['code']);
            }
        }
        $path = $personne->avatar;
        if ($request->hasFile('avatar')) {
            Storage::disk('public')->delete($personne->avatar);
            $path = $request->file('avatar')->storeAs('avatars', 'avatar_de_' . $personne->id . '.' . $request->file('avatar')->extension(), 'public');
        }
        $personne->nom = $request->get('nom');
        $personne->prenom = $request->get('prenom');
        $user->name = $request->prenom . ' ' . $request->nom;
        $user->email = $request->get('email');
        if ($request->has('password'))
            $user->password = bcrypt($request->get('password'));
        if ($request->has('cv')) {
            $personne->cv = $request->get('cv');
        }
        if ($request->has('specialite')) {
            $personne->specialite = $request->get('specialite');
        }
        if ($request->has('actif')) {
            if ($request->get('actif'))
                $personne->actif = 1;
            else
                $personne->actif = 0;
        }
        $personne->avatar = $path;
        $personne->save();
        $user->save();
        $this->data['status'] = true;
        $this->data['code'] = 200;
        $this->data['data'] = new PersonneResource($personne);
        $this->data['err'] = null;
        return response()->json($this->data, $this->data['code']);
    }

    public function show($id) {
        $personne = Personne::find($id);
        if (!$personne) {
            $this->data['status'] = false;
            $this->data['code'] = 422;
            $this->data['data'] = null;
            $this->data['err'] = [
                'code' => 1,
                'message' => sprintf('La personne avec l\'id : %d n\'est pas dans la base', $id),
            ];
        } else {
            $this->data['status'] = true;
            $this->data['code'] = 200;
            $this->data['data'] = new PersonneResource($personne);
            $this->data['err'] = null;
        }
        return response()->json($this->data, $this->data['code']);
    }

    public function destroy($id)
    {
        $personne = Personne::find($id);
        if (!$personne) {
            $this->data['status'] = false;
            $this->data['code'] = 422;
            $this->data['data'] = null;
            $this->data['err'] = [
                'code' => 1,
                'message' => sprintf('La personne avec l\'id : %d n\'est pas dans la base', $id),
            ];
            return response()->json($this->data, $this->data['code']);
        }
        Log::info('path de l\'avatar à supprimer : '.$personne->avatar);
        Storage::disk('public')->delete($personne->avatar);
        $user = $personne->user;
        if ($user->delete()) {
            return response()->json([
                'success' => true
            ], 204);
        } else {
            $this->data['status'] = false;
            $this->data['code'] = 422;
            $this->data['data'] = null;
            $this->data['err'] = [
                'code' => 1,
                'message' => sprintf('La personne avec l\'id : %d ne peut pas être supprimée', $id),
            ];
            return response()->json($this->data, $this->data['code']);
        }
    }
}
