<?php

if (! function_exists('inertia_ui_path')) {
    function inertia_ui_path(): string {
        return __DIR__.'/../';
    }
}

if (! function_exists('inertia_render')) {
    function inertia_render(string $page, array $data = []) {

        if (class_exists(\Laravel\Jetstream\Jetstream::class)) {
            return \Laravel\Jetstream\Jetstream::inertia()->render(request(), $page, $data);
        }

        return \Inertia\Inertia::render($page, $data);
    }
}
