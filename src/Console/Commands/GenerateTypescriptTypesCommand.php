<?php

namespace Ja\InertiaUI\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Schema;

class GenerateTypescriptTypesCommand extends Command
{
    protected $signature = 'inertia-ui:generate-model-types.ts';

    protected $description = 'Generate TypeScript base types.ts file from model definitions';

    public array $typeMap = [
        'any' => 'any',
        'string' => 'string',
        'int' => 'number',
        'bigint' => 'number',
        'double' => 'number',
        'tinyint' => 'boolean',
        'timestamp' => 'string',
        'varchar' => 'string',
        'char' => 'string',
        'text' => 'string',
        'json' => 'any',
    ];

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $modelFilenames = File::files(app_path('Models'));
        // $outputFilePath = inertia_ui_path('resources/js/model-types.ts');
        $outputFilePath = base_path('resources/js/model-types.ts');

        $content = collect();

        $content = $content->push(implode(PHP_EOL, [
            "/*",
            "NOTE:",
            "This file is auto-generated via the `php artisan {$this->signature}` command. Changes to this file will be overriden.",
            "To change these types, extend them in another file (or update the model definitions).",
            "*/"
        ]));

        $content = $content->push("namespace Models {"); // Start namespace definition

        $content = $content->concat(
            collect($modelFilenames)->map(function ($file) {
                $modelClassName = '\\App\\Models\\'.Str::remove('.php', $file->getFilename());
                $modelTypeName = class_basename($modelClassName);
                $modelClass = new $modelClassName();
                $columns = Schema::getColumns($modelClass->getTable());
                $indent = "  ";
                $buildDefinition = collect($indent."export interface {$modelTypeName} {");

                if (count($appends = $modelClass->getAppends()) > 0) {
                    $columns = array_merge($columns, collect($appends)->map(fn ($append) => [
                        'name' => $append,
                        'type_name' => 'any',
                        'nullable' => true,
                    ])->toArray());
                }

                collect($columns)
                    ->filter(fn ($col) => (
                        !in_array($col['name'], $modelClass->getHidden())
                    ))
                    ->each(fn ($col) => (
                        $buildDefinition->push(
                            $indent.$indent."{$col['name']}: {$this->typeMap[$col['type_name']]}".($col['nullable'] ? '|null' : '')
                        )
                    ));

                $buildDefinition->push($indent."}");

                return $buildDefinition->join(PHP_EOL);
            })
        );

        $content = $content->push("}".PHP_EOL."export default Models"); // End namespace definition

        File::put($outputFilePath, $content->join(PHP_EOL.PHP_EOL));

        $this->comment('TypeScript resources/js/model-types.ts generated');
    }
}
