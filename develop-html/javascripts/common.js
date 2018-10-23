$( function(){

  /* slide toggle
  ******************************/
  $( '.header__catchphrase__search-button' ).click( function(){
    $( '.is-searchbox-display' ).slideToggle();
  } );

  $( '.header__nav__menu__categories__heading' ).click( function(){
    $( '.is-nav-categories-display' ).slideToggle();
    $( '.is-nav-tags-display' ).hide();
  } );

  $( '.header__nav__menu__tags__heading' ).click( function(){
    $( '.is-nav-tags-display' ).slideToggle();
    $( '.is-nav-categories-display' ).hide();
  } );


  /* slider
  ******************************/
  $( '.hero' ).slick({
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    arrows: false
  });

  $( '.special-feature__slider' ).slick({
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 1,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: '60px',
          slidesToShow: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  });


  /* ランキングタブ切り替え
  ******************************/
  if ( $( '#today[name=ranking__contents__tabs--item]:checked' ).val() == "on" ) {
    $( '#today__articles' ).show();
  }

  $( '#today' ).click( function() {
    $( '#today__articles' ).show();
    $( '#weekly__articles' ).hide();
    $( '#monthly__articles' ).hide();
  });

  $( '#weekly' ).click( function() {
    $( '#weekly__articles' ).show();
    $( '#today__articles' ).hide();
    $( '#monthly__articles' ).hide();
  });

  $( '#monthly' ).click( function() {
    $( '#monthly__articles' ).show();
    $( '#today__articles' ).hide();
    $( '#weekly__articles' ).hide();
  });


  /* 図鑑タブ切り替え
  ******************************/
  if ( $( '#beaches[name=visual-dictionary__contents__tabs--item]:checked' ).val() == "on" ) {
    $( '#beaches__summary' ).show();
    $( '#seafood__summary' ).hide();
    $( '#mountains__summary' ).hide();
    $( '#animal__summary' ).hide();
    $( '#plant__summary' ).hide();
  }

  $( '#beaches' ).click( function() {
    $( '#beaches__summary' ).show();
    $( '#seafood__summary' ).hide();
    $( '#mountains__summary' ).hide();
    $( '#animal__summary' ).hide();
    $( '#plant__summary' ).hide();
  });

  $( '#seafood' ).click( function() {
    $( '#beaches__summary' ).hide();
    $( '#seafood__summary' ).show();
    $( '#mountains__summary' ).hide();
    $( '#animal__summary' ).hide();
    $( '#plant__summary' ).hide();
  });

  $( '#mountains' ).click( function() {
    $( '#beaches__summary' ).hide();
    $( '#seafood__summary' ).hide();
    $( '#mountains__summary' ).show();
    $( '#animal__summary' ).hide();
    $( '#plant__summary' ).hide();
  });

  $( '#animal' ).click( function() {
    $( '#beaches__summary' ).hide();
    $( '#seafood__summary' ).hide();
    $( '#mountains__summary' ).hide();
    $( '#animal__summary' ).show();
    $( '#plant__summary' ).hide();
  });

  $( '#plant' ).click( function() {
    $( '#beaches__summary' ).hide();
    $( '#seafood__summary' ).hide();
    $( '#mountains__summary' ).hide();
    $( '#animal__summary' ).hide();
    $( '#plant__summary' ).show();
  });

} );
