<?php

use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesTableSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // create permissions
        Permission::create(['name' => 'create taches']);
        Permission::create(['name' => 'edit taches']);
        Permission::create(['name' => 'delete taches']);

        // this can be done as separate statements
        $role = Role::create(['guard_name' => 'api', 'name' => 'manager']);
        $role->givePermissionTo('edit taches', 'create taches');


        $role = Role::create(['guard_name' => 'api', 'name' => 'admin-taches']);
        $role->givePermissionTo(Permission::all());

        $role = Role::create(['guard_name' => 'api', 'name' => 'superadmin']);

        $user = User::where('email', 'gollum@domain.fr')->first();
        $user->assignRole($role);

        $user = User::where('email', 'robert.duchmol@domain.fr')->first();
        $role = Role::findByName('manager','api');
        $user->assignRole($role);


//        $role = Role::create(['guard_name' => 'api', 'name' => 'admin-taches']);
        //$role = Role::create(['name' => 'superadmin']);
        Log::info("coucou ".\Spatie\Permission\Guard::getDefaultName($role));
//        $user = User::where('email', 'gollum@domain.fr')->first();
//        $user->assignRole('admin-taches');
        //$user->assignRole('superadmin', 'api');

    }
}
