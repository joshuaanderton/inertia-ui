<?php

namespace Ja\InertiaUI\Providers;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\File;
use Illuminate\Support\ServiceProvider as BaseServiceProvider;
use Ja\InertiaUI\Console\Commands\GenerateInertiaComponentCommand;
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
                GenerateInertiaComponentCommand::class
            ]);
        }

        Blade::directive('translations', function ($exp) {
            $translations = collect(File::allFiles(__DIR__.'/../../lang/generated'))->map(function ($file) {
                $locale = str($realPath = $file->getRealPath())->basename()->remove('.json')->toString();
                $content = json_decode(File::get($realPath));

                return [$locale => $content];
            })->collapse();

            return '<script>window.Translations = '.$translations->toJson().'</script>';
        });
    }
}
