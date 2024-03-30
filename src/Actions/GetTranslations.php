<?php

namespace Ja\InertiaUI\Actions;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;
use Lorisleiva\Actions\Concerns\AsAction;
use Spatie\TranslationLoader\LanguageLine;

class GetTranslations
{
    use AsAction;

    public function handle(?string $locale = null): array
    {
        $translations = Cache::get('app_translations', function () use ($locale) {
            $locale = strtolower($locale ?: app()->getLocale());
            $defaultLocale = strtolower(config('app.locale', 'en'));

            $translations = $this->getTranslations($locale);

            if ($locale === $defaultLocale) {
                $translations = $translations->merge($this->getTranslations($defaultLocale));
            }

            $json = $translations->toJson();

            Cache::put('app_translations', $json);

            return $json;
        });

        return json_decode($translations, true);
    }

    public static function flushCache(): void
    {
        Cache::forget('app_translations');
    }

    private function getTranslations(string $locale): Collection
    {
        // Get the default translation files
        try {
            $defaultTranslations = collect(json_decode(File::get($this->langPath($locale)), true));
        } catch(\Exception $e) {
            $defaultTranslations = collect();
        }

        // Get the translations from the database
        $translations = LanguageLine::get()
            ->map(fn ($line) =>
                ["{$line->group}.{$line->key}" => $line->text[$locale] ?? '']
            )
            ->collapse();

        return $defaultTranslations->merge($translations);
    }

    private function langPath(string $locale): string
    {
        $locale = str($locale)->explode('.')->first();
        return __DIR__."/../../lang/{$locale}.json";
    }
}
