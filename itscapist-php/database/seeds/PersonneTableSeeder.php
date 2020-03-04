<?php

use App\Modeles\Personne;
use App\User;
use Illuminate\Database\Seeder;

class PersonneTableSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        $faker = Faker\Factory::create('fr_FR');
        $personnes = factory(Personne::class, 10)->make()
            ->each(function ($personne) use ($faker) {
                $user = factory(User::class)->create([
                    'name' => $personne->prenom . ' ' . $personne->nom,
                    'email' => $personne->prenom . '.' . $personne->nom . '@' . $faker->randomElement(['domain.fr', 'gmail.com', 'hotmail.com', 'truc.com', 'machin.fr'])
                ]);
                $personne->user_id = $user->id;
                $personne->save();
            });
        $user  = factory(User::class)->create([
            'name' => 'Robert Duchmol',
            'email' => 'robert.duchmol@domain.fr',
            'password' => '$2y$10$UFYqX8c1aRFtvZ6AdlV17uesbirEwrRpCz1/fKmFZL2PXSyiHqoG2', // secret
        ]);
        $personne = factory(Personne::class)->make([
            'nom' => 'Duchmol',
            'prenom' => 'Robert',
            'cv' => 'PersonneResource utilisée en exemple',
        ]);
        $personne->user_id = $user->id;
        $personne->save();
        $user = factory(User::class)->create([
            'name' => 'Gollum',
            'email' => 'gollum@domain.fr',
            'password' => '$2y$10$UFYqX8c1aRFtvZ6AdlV17uesbirEwrRpCz1/fKmFZL2PXSyiHqoG2', // secret
        ]);
        $personne = factory(Personne::class)->make([
            'nom' => 'Smeagol',
            'prenom' => '',
            'cv' => 'Gollum est un personnage fictif du légendaire créé par l’écrivain britannique J. R. R. Tolkien et qui apparaît dans ses romans Le Hobbit et Le Seigneur des anneaux. Connu en tant que Sméagol à l\'origine, Gollum est un Hobbit de la branche des Forts, qui vivait aux Champs aux Iris vers 2440 T. A..',
            'avatar' => 'avatars/gollum.jpeg',
        ]);
        $personne->user_id = $user->id;
        $personne->save();
    }
}
