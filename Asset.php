<?php
namespace app\components\modules\eexpression;

use yii\web\AssetBundle;

class Asset extends AssetBundle {
    public $sourcePath = '@app/components/modules/eexpression/assets';
    public $js = [
        'script.js',
    ];
}