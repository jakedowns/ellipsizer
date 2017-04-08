# ellipsizer
A JS method for ellipsizing elements which contain nested block-level elements (edge case not supported by text-overflow: ellipsis)

**Interactive Demo** https://jakedowns.github.io/ellipsizer/

## usage
See index.html for an example.

1. make sure you have jQuery loaded
2. require this plugin or load it via a script tag
3. call it via:
```
$('.example-js-overflow').ellipsize();

// alternatively, you can pass in an options object to override default options:

$('.example-js-overflow').ellipsize({
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
});
```
---

## related
- [per-word-action](https://www.npmjs.com/package/per-word-action) (Dependency)
- [jquery-ellipsis](https://github.com/STAR-ZERO/jquery-ellipsis) (Previous Art, Abandoned)

