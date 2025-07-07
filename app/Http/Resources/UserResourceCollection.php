<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class UserResourceCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        /**
         * resourceCollection tidak bisa mengatur properti yang kita inginkan:
         * kode berikut tidak akan berfungsi:
         * return [
         *     'id' => $this->id,
         *     'name' => $this->name,
         *    'email' => $this->email,
         * ]
         * Hal ini karena resourceCollection tidak memiliki properti yang bisa diatur.
         * Untuk mengatur properti yang kita inginkan, kita harus menggunakan resource biasa.
         * Contoh:
         * return UserResource::collection($this->collection);
         * Namun, jika kita ingin mengatur properti yang kita inginkan, kita harus menggunakan
         * resource biasa, bukan resourceCollection.
         * Contoh:
         * return UserResource: :collection($this->collection)->setAllowedFields(['name','data  
         * _sekolah.name']);
         */
        return parent::toArray($request);
        
        
    }
    /**
     * Customize the pagination information for the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  array $paginated
     * @param  array $default
     * @return array
     */
    public function paginationInformation(Request $request, $paginated, $default)
    {
        //  $default['links']['first'] = 'http://edurasa_public.test/approval-akun';
        $pathCustom = 'http://edurasa_public.test/approval-api';
        // custom links yang ada di meta;
        $customLinksUrl = [];//array_map(function());

        // get all default link yang ada di meta:
        $linksUrl = $default['meta']['links'];
        // dd($linksUrl);
        foreach ($linksUrl as $key =>$value) {
            $parambefore = parse_url($value['url'], PHP_URL_QUERY);
            $myCustomLink =  $pathCustom . '?'. $parambefore;
            if($value['url'] === null) {
                $myCustomLink = null;
            };
            $customLinksUrl[] = [
                'url' => $myCustomLink,
                'label' => $value['label'],
                'active' => $value['active']
            ];

        }
        $linksParent = $default['links']; // formatnya seperti object
        $customLinksParent['first']= $linksParent['first'] ? $pathCustom . '?' .parse_url($linksParent['first'], PHP_URL_QUERY): null;
        $customLinksParent['last']= $linksParent['last'] ?    $pathCustom . '?' .parse_url($linksParent['last'], PHP_URL_QUERY) : null;
        $customLinksParent['next']= $linksParent['next'] ?    $pathCustom . '?' .parse_url($linksParent['next'], PHP_URL_QUERY) :null;
        $customLinksParent['prev']= $linksParent['prev'] ?   $pathCustom . '?' .parse_url($linksParent['prev'], PHP_URL_QUERY) : null;
        //
        $default['meta']['path'] =  $pathCustom;
        $default['meta']['links'] = $customLinksUrl;
        // $default['meta']['customlinks'] = $customLinksUrl;
        // $default['customlinks'] = $customLinksParent;
        $default['links'] = $customLinksParent;


        return $default;
    }
}
