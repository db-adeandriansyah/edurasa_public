<?php

namespace App\Http\Resources;


use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class DataApiCollection extends ResourceCollection
{
     public $collects = UserResource::class;
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return parent::toArray($request);
    }
    public function paginationInformation(Request $request, $paginated, $default)
    {
        //  $default['links']['first'] = 'http://edurasa_public.test/approval-akun';
        // $pathCustom = 'http://edurasa_public.test/daftar-akun-api';
        $pathCustom = env('APP_URL').'/daftar-akun-api';
        // $pathCustom = '/daftar-akun-api';
        // custom links yang ada di meta;
        $customLinksUrl = [];//array_map(function());

        // get all default link yang ada di meta:
        $linksUrl = $default['meta']['links'];
        // dd($linksUrl);
        foreach ($linksUrl as $key =>$value) {
            $parambefore = parse_url($value['url'], component: PHP_URL_QUERY);
            $myCustomLink =  $pathCustom . '?'. $parambefore;
            if($value['url'] === "") {
                $myCustomLink = "";
            };
            $customLinksUrl[] = [
                'url' => $myCustomLink,
                'label' => $value['label'],
                'active' => $value['active']
            ];

        }
        $linksParent = $default['links']; // formatnya seperti object
        $customLinksParent['first']= $pathCustom . '?' .parse_url($linksParent['first'], PHP_URL_QUERY);
        $customLinksParent['last']=   $pathCustom . '?' .parse_url($linksParent['last'], PHP_URL_QUERY) ;
        $customLinksParent['next']=   $pathCustom . '?' .parse_url($linksParent['next'], PHP_URL_QUERY);
        $customLinksParent['prev']=  $pathCustom . '?' .parse_url($linksParent['prev'], PHP_URL_QUERY) ;
        //
        $default['meta']['path'] =  $pathCustom;
        $default['meta']['links'] = $customLinksUrl;
        // $default['meta']['customlinks'] = $customLinksUrl;
        // $default['customlinks'] = $customLinksParent;
        $default['links'] = $customLinksParent;


        return $default;
    }
}
