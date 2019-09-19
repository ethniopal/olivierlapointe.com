<?php
get_button( [
    'label' => 'Ton bouton',
    'href' => '#!',
    'class' => 'green',
    'target' => ''
]);

function get_button($arr_value)
{
    $class = '';
    $href = '#!';
    $label = '';
    $target = '_self';
    foreach ($arr_value as $key => $value) {

        switch ($key) {
            case 'class':
                $class = $value ? $value : $class; break;
            case 'href':
                $href = $value ? $value : $href;  break;
            case 'label':
                $label = $value ? $value : $label; break;
            case 'target':
                $target = $value ? $value : $target; break;
        }
    }

    return '<a href="' . $href . '" class="' . $class . '" target="'.$target.'">'.$label.'</a>';
}