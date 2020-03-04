<?php

use App\Modeles\Personne;
use App\Modeles\Tache;
use Illuminate\Database\Seeder;

class PersonneTacheTableSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        $taches = Tache::all();
        $personnes_id = Personne::all('id')->pluck('id')->toArray();
        $faker = Faker\Factory::create('fr_FR');

        foreach ($taches as $tache) {
            $nbPersonnes = $faker->numberBetween($min = 1, $max = 10);
            $id_personnes = $faker->unique()
                ->randomElements($personnes_id, $nbPersonnes);
            $tache->personnes()->attach($id_personnes);
            $tache->save();
        }
    }
}
