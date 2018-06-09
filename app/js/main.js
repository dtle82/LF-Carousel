$(document).ready(() => {

    $(".ls-carousel").on("click",".btn-prev",() => {

        // reset the timer if interrupted by click
        clearInterval(countdown);
        countdown = call_countdown()

        let current_image = $(".active");
        let current_dot = $(".btn-active");

        let totat_image_count = $(".slider").length;

        if(current_image.prev().length) {
            current_image.prev().addClass('active');
            current_image.removeClass('active');

            current_dot.prev().addClass('btn-active');
            current_dot.removeClass('btn-active');
        } else {
            current_image.removeClass('active');
            $(".slider").eq(totat_image_count-1).addClass('active');

            current_dot.removeClass('btn-active');
            $(".dots li").eq(totat_image_count-1).addClass('btn-active');
        }
    })

    $(".ls-carousel").on("click",".btn-next",() => {

        // reset the timer if interrupted by click
        clearInterval(countdown);
        countdown = call_countdown()

        let current_image = $(".active");
        let current_dot = $(".btn-active");

        let totat_image_count = $(".slider").length;

        if(current_image.next().length) {
            current_image.next().addClass('active');
            current_image.removeClass('active');

            current_dot.next().addClass('btn-active');
            current_dot.removeClass('btn-active');
        } else {
            current_image.removeClass('active');
            $(".slider").eq(totat_image_count-totat_image_count).addClass('active');

            current_dot.removeClass('btn-active');
            $(".dots li").eq(totat_image_count-totat_image_count).addClass('btn-active');
        }
    })

    $(".btn").on("click",function(){
        // reset the timer if interrupted by click
        clearInterval(countdown);
        countdown = call_countdown()
        let current_image = $(".active");
        let current_dot = $(".btn-active");

        current_image.removeClass('active');
        current_dot.removeClass('btn-active');

        let current_eq_value = $(event.currentTarget).attr('data-id');
        $(".dots li").eq(current_eq_value).addClass('btn-active');
        $(".slider").eq(current_eq_value).addClass('active');
    });

    let global_counter = 10;
    let countdown = call_countdown();

    function call_countdown() {
        global_counter = 10;
        return setInterval(()=>{
            global_counter--;
            $("#countdown h2").html(global_counter);
            if(global_counter === 0) {
                $('.btn-next').trigger('click');
            }
        },1000);
    }
})