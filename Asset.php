<?php
namespace shahimian\parser;

use yii\web\AssetBundle;

class Asset extends AssetBundle {
    public $sourcePath = '@vendor/shahimian/yii2-parser/assets';
    public $js = [
        'script.js',
    ];
}