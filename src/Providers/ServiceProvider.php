<?php

namespace Ja\InertiaUI\Providers;

use Illuminate\Support\ServiceProvider as BaseServiceProvider;
use Ja\InertiaUI\Console\Commands\GenerateInertiaPageCommand;
use Ja\InertiaUI\Console\Commands\GenerateTranslationFilesCommand;
use Ja\InertiaUI\Console\Commands\GenerateTypescriptTypesCommand;

class ServiceProvider extends BaseServiceProvider
{
    public function register()
    {
        //
    }

    public function boot()
    {
        $this->commands([
            GenerateTranslationFilesCommand::class,
        ]);

        if ($this->app->runningInConsole()) {
            $this->commands([
                GenerateTypescriptTypesCommand::class,
                GenerateInertiaPageCommand::class,
            ]);
        }
    }
}
