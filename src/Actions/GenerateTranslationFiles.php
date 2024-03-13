<?php

namespace Ja\InertiaUI\Actions;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\File;
use Lorisleiva\Actions\Concerns\AsAction;
use Spatie\TranslationLoader\LanguageLine;

class GenerateTranslationFiles
{
    use AsAction;

    public function handle(): Collection
    {
        $languageLines = LanguageLine::get();
        $defaults = [
            'en' => json_decode(File::get(__DIR__.'/../../lang/en.json'), true)
        ];

        $filePaths = (
            collect(config('app.supported_locales'))
                ->map(function ($locale) use ($languageLines, $defaults) {

                    $translations = collect($defaults[$locale] ?? []);

                    $translations = $translations->merge(
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
                        lang_path("{$locale}.json"),
                        json_encode($translations->toArray(), JSON_PRETTY_PRINT)
                    );

                    return "lang/{$locale}.json";
                })
                ->whereNotNull()
        );

        return $filePaths;
    }
}
