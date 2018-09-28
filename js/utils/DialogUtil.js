import Constant from '../config/Constant';

let {TIME_SHORT} = Constant;
/**
 * 创建toast提醒
 */
export function showTips(msg, time) {
    let $div = $('<div>');
    time = time ? time : TIME_SHORT;
    $div.text(msg);
    let width = $(window).width(),
        height = $(window).height();
    $div.css({
        position: 'fixed',
        padding: '20px',
        top: height / 2,
        left: width / 2,
        transform: 'translate(-50%,-50%)',
        'font-size': '18px',
        'z-index': 999,
        background: 'black',
        color: 'white'
    });
    $('body').append($div);
    setTimeout(function () {
        $div.remove();
    }, time);
}
