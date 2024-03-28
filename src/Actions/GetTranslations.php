<?php

namespace Ja\InertiaUI\Actions;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\File;
use Lorisleiva\Actions\Concerns\AsAction;

class GetTranslations
{
    use AsAction;

    public function handle(?string $locale = null): array
    {
        $locale = $locale ?: app()->getLocale();
        $defaultLocale = 'en';

        try {
            return [$locale => json_decode(File::get($this->langPath($locale)))];
        } catch (\Exception $e) {
            return [$defaultLocale => json_decode(File::get($this->langPath($defaultLocale)))];
        }
    }

    private function langPath(string $locale): string
    {
        $locale = str($locale)->explode('.')->first();
        return __DIR__."/../../lang/generated/{$locale}.json";
    }
}
