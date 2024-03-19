<?php

namespace Ja\InertiaUI\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class GenerateInertiaComponentCommand extends Command
{
    protected $signature = 'inertia-ui:make:component {name}';

    protected $description = 'Generate new blank Inertia component template';

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
        File::ensureDirectoryExists(resource_path("js/Components/{$path}"));

        $path = "{$path}/{$this->componentName}.tsx";

        // Write file using stub
        File::put(
            resource_path("js/Components/{$path}"),
            $this->stub()
        );

        $this->comment("Inertia component generated at resources/js/Components/{$this->componentName}.tsx");
    }

    protected function stub()
    {
        $stub = File::get(__DIR__.'/../../stubs/js/Components/Component.tsx.txt');

        return str($stub)->replace('{{ name }}', $this->componentName);
    }
}
