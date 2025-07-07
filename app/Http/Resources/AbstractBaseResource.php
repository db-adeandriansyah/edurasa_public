<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

abstract class AbstractBaseResource extends JsonResource
{
    protected ?array $manualAllowedFields = null;

    abstract protected function fields(Request $request): array;

    /**
     * Allow manual field override.
     */
    public function setAllowedFields(array $fields): static
    {
        $this->manualAllowedFields = $fields;
        return $this;
    }

    protected function allowedFields(Request $request): ?array
    {
        if ($this->manualAllowedFields !== null) {
            return $this->manualAllowedFields;
        }

        $fields = $request->fields
            ?? $request->query('fields')
            ?? $request->input('fields');

        if ($fields) {
            return is_array($fields)
                ? $fields
                : explode(',', $fields);
        }

        return null;
    }

    protected function filterFieldsRecursive(array $data, ?array $allowed): array
    {
        if (!$allowed) return $data;

        $filtered = [];

        foreach ($allowed as $field) {
            if (Str::contains($field, '.')) {
                [$parent, $child] = explode('.', $field, 2);
                if (isset($data[$parent]) && is_array($data[$parent])) {
                    $childFields = collect($allowed)
                        ->filter(fn($f) => Str::startsWith($f, $parent . '.'))
                        ->map(fn($f) => Str::after($f, $parent . '.'))
                        ->values()
                        ->toArray();

                    $filtered[$parent] = $this->filterFieldsRecursive($data[$parent], $childFields);
                }
            } else {
                if (array_key_exists($field, $data)) {
                    $filtered[$field] = $data[$field];
                }
            }
        }

        return $filtered;
    }

    public function toArray(Request $request): array
    {
        $allFields = $this->fields($request);
        $allowed   = $this->allowedFields($request);

        return $this->filterFieldsRecursive($allFields, $allowed);
    }
}
