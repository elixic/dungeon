define([], function() {
    return {
        getRandomNumberBetween: function(min, max) {
            if (max <= min) return throw Error("Max must be greater than min");

            var number = Math.ceil(Math.random() * 1000000);
            number = number % max;
            number = number + 1;
            if (number < min) {
                number = min;
            }

            return number;
        }
    }
})