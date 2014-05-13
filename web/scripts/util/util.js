define([], function() {
    function stringReplace(original, pattern, replacement, start, end) {
        var front = "",
            middle = "",
            tail = "";

        if (start > 0) {
            front = original.slice(0,start);
        }

        if (end < original.length - 1) {
            tail = original.slice(end, original.length);
        }

        if (start > 0 || end < original.length) {
            middle = original.slice(start, end);
        } else {
            middle = original;
        }

        middle = middle.replace(pattern, replacement);

        console.log(front + " " + middle + " " + tail);
        return front + middle + tail;
    };

    function getRandomNumberBetween(min, max) {
        if (max <= min) throw Error("Max must be greater than min");

        var number = Math.ceil(Math.random() * 1000000);
        number = number % max;
        number = number + 1;
        if (number < min) {
            number = min;
        }

        return number;
    };

    return {
        stringReplace: stringReplace,
        getRandomNumberBetween: getRandomNumberBetween
    }
})