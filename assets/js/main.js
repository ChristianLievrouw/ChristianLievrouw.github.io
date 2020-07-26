/*
	Photon by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

  var	$window = $(window),
    $body = $('body');

  const getAjax = { method: 'get', dataType: 'json'};
  $.ajax('./data/projects.json', getAjax)
    .then(data => {
      const arrayOfProjects = data.projects;
      arrayOfProjects.forEach((project) => {
        Projects.all.push(new Projects(project));
      });
    })
    .then(() => {
      renderProjects();
    });

  // Breakpoints.
  breakpoints({
    xlarge:   [ '1141px',  '1680px' ],
    large:    [ '981px',   '1140px' ],
    medium:   [ '737px',   '980px'  ],
    small:    [ '481px',   '736px'  ],
    xsmall:   [ '321px',   '480px'  ],
    xxsmall:  [ null,      '320px'  ]
  });

  // Play initial animations on page load.
  $window.on('load', function() {
    window.setTimeout(function() {
      $body.removeClass('is-preload');
    }, 100);
  });

  // Scrolly.
  $('.scrolly').scrolly();

})(jQuery);


function Projects(project){
  for(let key in project){
    this[key] = project[key];
  }
}

Projects.all = [];

Projects.prototype.render = function () {
  const templateHTML = $('#projects-template').html();
  const renderHTML = Mustache.render(templateHTML, this);
  return renderHTML;
}

function renderProjects() {
  Projects.all.forEach(project => {
    $('.placeholder').append(project.render())
  });
}

