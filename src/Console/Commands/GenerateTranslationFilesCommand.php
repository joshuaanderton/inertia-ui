<?php

namespace Ja\InertiaUI\Console\Commands;

use Illuminate\Console\Command;
use Ja\InertiaUI\Actions\GenerateTranslationFiles;

class GenerateTranslationFilesCommand extends Command
{
    protected $signature = 'inertia-ui:generate-translations';

    protected $description = 'Generate translations json files from database';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $filePaths = GenerateTranslationFiles::run();

        $this->comment($filePaths->count().' translation file(s) generated');
    }
}
