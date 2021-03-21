$("button").on("click", function() {
  var name = $(this).attr("name");
  var divContent = $(`#${name}`).html();
  if (divContent == ""){
    $(`#${name}`).html(`
      <iframe src="${name}/${name}.html"></iframe>
    `);
    $(this).html("Close");
  } else {
    $(`#${name}`).html('');
    $(this).html(name[0].toUpperCase() + name.slice(1));
  }
});
