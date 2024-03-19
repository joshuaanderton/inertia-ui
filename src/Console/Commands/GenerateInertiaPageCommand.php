<?php

namespace Ja\InertiaUI\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class GenerateInertiaPageCommand extends Command
{
    protected $signature = 'inertia-ui:make:page {name}';

    protected $description = 'Generate new blank Inertia page template';

    protected string $componentName;

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $name = str($this->argument('name'))->studly();

        $this->componentName = basename($name);

        $path = dirname($name);

        // Create directory for file
        File::ensureDirectoryExists(resource_path("js/Pages/{$path}"));

        $path = "{$path}/{$this->componentName}.tsx";

        // Write file using stub
        File::put(
            resource_path("js/Pages/{$path}"),
            $this->stub()
        );

        $this->comment("Inertia page generated at resources/js/Pages/{$this->componentName}");
    }

    protected function stub()
    {
        $stub = File::get(__DIR__.'/../../stubs/js/Pages/Page.tsx.txt');
        $stub = str($stub);
        $stub = $stub->replace('{{ name }}', $this->componentName);

        if ($this->option('form')) {
            $formMethod = 'post'; // post, put, delete, get
            $formRoute = '';
            $stub = $stub->replace('{{ form_route }}', $formRoute);
            $stub = $stub->replace('{{ form_method }}', $formMethod);
        }

        return $stub->toString();
    }
}
