var options = function(){
    const default_options = {
        pairs: 2,
        difficulty: 'normal',
        level: 'level2'
    };
    
    var pairs = $('#pairs');
    var difficulty = $('#dif1');
    var level = $('#lev');

    var options = JSON.parse(localStorage.options || JSON.stringify(default_options));
    pairs.val(options.pairs);
    difficulty.val(options.difficulty);
    level.val(options.level);

    pairs.on('change', () => options.pairs = pairs.val());
    difficulty.on('change', () => options.difficulty = difficulty.val());
    level.on('change', () => options.level = level.val());

    return { 
        applyChanges: function() {
            localStorage.options = JSON.stringify(options);
        },
        defaultValues: function() {
            options.pairs = default_options.pairs;
            options.difficulty = default_options.difficulty;
            options.level = default_options.level;
            pairs.val(options.pairs);
            difficulty.val(options.difficulty);
            level.val(options.level);
        }
    };
}();

$('#default').on('click', function() {
    options.defaultValues();
});

$('#apply').on('click', function() {
    options.applyChanges();
    location.assign("../");
});
