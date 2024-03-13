<?php

namespace Ja\InertiaUI\Actions;

use Exception;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;
use Lorisleiva\Actions\Concerns\AsAction;
use Spatie\TranslationLoader\LanguageLine;

class GenerateTranslationFiles
{
    use AsAction;

    private function packageLangPath(string ...$path)
    {
        return collect(__DIR__."/../../lang")->concat($path)->flatten()->join('/');
    }

    public function handle(): Collection
    {
        $languageLines = LanguageLine::get();
        $locales = (
            $languageLines
                ->whereNotNull('text')
                ->pluck('text')
                ->map(fn ($text) => array_keys($text))
                ->flatten()
                ->unique()
        );

        $filePaths = (
            collect($locales)->map(function ($locale) use ($languageLines) {

                $default = null;

                try {
                    $default = json_decode(File::get($this->packageLangPath("{$locale}.json")), true);
                } catch (Exception $e) {
                    //
                }

                $translations = collect($default);

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
                    $this->packageLangPath('generated', "{$locale}.json"),
                    json_encode($translations->toArray(), JSON_PRETTY_PRINT)
                );

                return $locale;
            })
            ->whereNotNull()
        );

        Artisan::call('view:clear');

        return $filePaths;
    }
}
