require('per-word-action');
// require('underscore');
$.fn.ellipsize = function(options){

  var $this = this;

  /*

    TODO: add options for fadeInOut effect and slideUpDown effect
    for now, we just do a hard show/hide effect

   */

  var default_options = {
    maxLines: 10,
    overflowLineCountThreshold: 3,
    ellipsisHtml: '&hellip;',
    readMoreHtml: 'Read More',
    readLessHtml: 'Read Less',
    onReadMore: ()=>{
      console.log('do read more!');
    },
    onReadLess: ()=>{
      console.log('do read less!');
    }
  };

  var opts = {...default_options, ...options};

  $(document).off('.elli');
  this.find('.elli-overflow').show().removeClass('elli-overflow');
  this.find('.elli-read-more, .elli-read-less').remove();

  var last_line = 1;
  this.perWordAction(($word, line_number)=>{
    //console.log('per word', line_number, $word.text());
    if(line_number > opts.maxLines){
      $word.addClass('elli-overflow');
    }
    last_line = Math.max(last_line, line_number);
  });

  // console.log(last_line, opts.maxLines);

  // var clamped_els = this.find('.elli-overflow');
  if(last_line - opts.maxLines > opts.overflowLineCountThreshold){
    finalize.call(this);
  }

  function finalize(){
    var $this = this;
    $this.find('.elli-overflow:first').prev().addClass('elli-overflow');

    $this.find('.elli-overflow').hide();
    $('<span class="elli-read-more"><span class="elli-char">'+opts.ellipsisHtml+'</span> <a class="elli-toggle-more" style="cursor:pointer; display:block; margin-top:10px;">' + opts.readMoreHtml + '</a><br/></span>').insertBefore('.elli-overflow:first');
    $('<span class="elli-read-less" style="display:none;"><a class="elli-toggle-less" style="cursor:pointer; display:block; margin-top:10px;">' + opts.readMoreHtml + '</a><br/></span>').insertAfter('.elli-overflow:last');

    $(document).on('click.elli', '.elli-toggle-more', function(){
      $this.find('.elli-overflow').show();
      $('.elli-read-more').hide();
      $('.elli-read-less').fadeIn();
      opts.onReadMore.call();
    });

    $(document).on('click.elli', '.elli-toggle-less', function(){
      $this.find('.elli-overflow').hide();
      $('.elli-read-more').fadeIn();
      $('.elli-read-less').hide();
      opts.onReadLess.call();
    });
  }

  $this = null;

}