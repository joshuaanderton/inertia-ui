<?php

namespace Ja\InertiaUI\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Spatie\TranslationLoader\LanguageLine;

class GenerateTranslationFilesCommand extends Command
{
    protected $signature = 'inertia-ui:generate-translations';

    protected $description = 'Generate translations json files from database';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $languageLines = LanguageLine::get();

        $filePaths = (
            collect(config('app.supported_locales'))
                ->map(function ($locale) use ($languageLines) {
                    $translations = (
                        $languageLines
                            ->filter(fn ($languageLine) => $languageLine->text[$locale] ?? false)
                            ->map(fn ($languageLine) => [
                                "{$languageLine->group}.{$languageLine->key}" => $languageLine->text[$locale]
                            ])
                            ->collapse()
                    );

                    if ($translations->count() === 0) {
                        return null;
                    }

                    File::put(
                        $path = lang_path("{$locale}.json"),
                        json_encode($translations->toArray(), JSON_PRETTY_PRINT)
                    );

                    return "lang/{$locale}.json";
                })
                ->whereNotNull()
        );

        $this->comment($filePaths->count() . ' translation file(s) generated');
    }
}
