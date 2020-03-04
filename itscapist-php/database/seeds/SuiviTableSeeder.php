<?php

use App\Modeles\Personne;
use App\Modeles\Suivi;
use App\Modeles\Tache;
use Illuminate\Database\Seeder;

class SuiviTableSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        $tachesId = Tache::all('id')->pluck('id')->toArray();
        $faker = Faker\Factory::create('fr_FR');
        factory(Suivi::class, 100)->make()
            ->each(function ($suivi) use ($tachesId, $faker) {
                $suivi->tache_id = $faker->randomElement($tachesId);
                $tache = Tache::find($suivi->tache_id);
                $personnesId = $tache->personnes->pluck('id')->toArray();
                $suivi->personne_id = $faker->randomElement($personnesId);
                $suivi->save();
            });
    }
}
