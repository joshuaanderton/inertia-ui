<?php

namespace Ja\InertiaUI\Providers;

use Illuminate\Support\ServiceProvider as BaseServiceProvider;
use Ja\InertiaUI\Console\Commands\GenerateTypescriptTypesCommand;

class ServiceProvider extends BaseServiceProvider
{
    public function register()
    {
        //
    }

    public function boot()
    {
        if ($this->app->runningInConsole()) {
            $this->commands([
                GenerateTypescriptTypesCommand::class,
            ]);
        }
    }
}
