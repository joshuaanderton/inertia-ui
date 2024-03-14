<?php

namespace Ja\InertiaUI\Actions;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\File;
use Lorisleiva\Actions\Concerns\AsAction;

class GetTranslations
{
    use AsAction;

    public function handle(): Collection
    {
        return collect(File::allFiles(__DIR__.'/../../lang/generated'))->map(function ($file) {
            $locale = str($realPath = $file->getRealPath())->basename()->remove('.json')->toString();
            $content = json_decode(File::get($realPath));

            return [$locale => $content];
        })->collapse();
    }
}
