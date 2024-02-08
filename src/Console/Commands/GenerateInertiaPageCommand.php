<?php

namespace Ja\InertiaUI\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Schema;

class GenerateInertiaPageCommand extends Command
{
    protected $signature = 'inertia-ui:make:page {name} {--jsx}';

    protected $description = 'Generate new blank Inertia page template';

    protected string $pageName;

    protected string $pageExt;

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $name = str($this->argument('name'))->camel()->ucfirst();

        $this->pageName = basename($name);

        $pagePath = dirname($name);

        $this->pageExt = $this->option('jsx') ? 'jsx' : 'tsx';

        // Create directory for file
        File::ensureDirectoryExists(resource_path("js/Pages/{$pagePath}"));

        $pagePath = "{$pagePath}/{$this->pageName}.{$this->pageExt}";

        // Write file using stub
        File::put(
            resource_path("js/Pages/{$pagePath}"),
            $this->pageStub()
        );

        $this->comment("Inertia page generated at resources/js/Pages/{$this->pageName}");
    }

    protected function pageStub()
    {
        $stub = File::get(__DIR__."/../../stubs/inertia-page.{$this->pageExt}.txt");

        return str($stub)->replace('{{ page_name }}', $this->pageName);
    }
}
