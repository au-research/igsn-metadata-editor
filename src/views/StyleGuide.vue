<template>
  <div class="p-4">
    <h1>Typography</h1>
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
    <h3>Heading 3</h3>
    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec
      urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra,
      tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti.</p>
    <p>Sed egestas, ante et <a href>vulputate volutpat</a>, eros pede semper est, vitae luctus metus libero eu augue.
      Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit
      <a href>tortor</a>. Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod
      dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.</p>

    <div class="grid grid-cols-2 gap-4">
      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec
        urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra,
        tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti.</p>
      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec
        urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra,
        tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti.</p>
    </div>

    <div class="grid grid-cols-3 gap-4">
      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec
        urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra,
        tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti.</p>
      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec
        urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra,
        tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti.</p>
      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec
        urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra,
        tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti.</p>
    </div>

    <hr class="my-4">

    <h1>Unordered list</h1>
    <ul>
      <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
      <li>Aliquam tincidunt mauris eu risus.</li>
      <li>Vestibulum auctor dapibus neque.</li>
    </ul>

    <hr class="my-4">

    <h1>Ordered list</h1>
    <ol>
      <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
      <li>Aliquam tincidunt mauris eu risus.</li>
      <li>Vestibulum auctor dapibus neque.</li>
    </ol>

    <hr class="my-4">

    <h1>Table</h1>
    <div class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
      <table class="table">
        <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Status</th>
          <th>Visibility</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td class="text-center">#1</td>
          <td>
            <p>
              <a href="">xenotime sample (Sample ELAI H / IGSN XXAB0011W) from the Neal McNaughton Legacy Collection SHRIMP mount 03-113</a>
            </p>
            <p class="text-sm text-gray-700">
              20.500.11812/XXZT1J7ED4EF151604534490031
            </p>
          </td>
          <td class="text-center">
            <span>Registered</span>
          </td>
          <td class="text-center">
            <span class="tag tag-green">Public</span>
          </td>
          <td class="text-sm font-medium text-center">
            <a href="" class="btn btn-blue"><i class="fa fa-edit"></i> Edit</a>
          </td>
        </tr>
        <tr>
          <td class="text-center">#2</td>
          <td>
            <p class="text-sm text-gray-700">
              20.500.11812/XXZT1J7ED4
            </p>
          </td>
          <td class="text-center">
            <span>Reserved</span>
          </td>
          <td class="text-center">
            <span class="tag tag-red">Private</span>
          </td>
          <td class="text-sm font-medium text-center">
            <a href="" class="btn btn-blue"><i class="fa fa-edit"></i> Edit</a>
          </td>
        </tr>
        <tr>
          <td class="text-center">#2</td>
          <td>
            <p>
              <a href="">xenotime</a>
            </p>
          </td>
          <td class="text-center">
            <span>Registered</span>
          </td>
          <td class="whitespace-no-wrap text-center">
            <span class="tag tag-yellow">Under Embargo</span>
          </td>
          <td class="text-sm font-medium text-center">
            <a href="" class="btn btn-blue"><i class="fa fa-edit"></i> Edit</a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <hr class="my-4">

    <h1>Buttons</h1>

    <div class="flex space-x-2 items-center my-2">
      <a href="" class="btn btn-blue">Blue button</a>
      <a href="" class="btn btn-blue"><i class="fa fa-edit"></i> Blue icon button</a>
      <a href="" class="btn btn-blue btn-sm">Blue button small</a>
      <a href="" class="btn btn-blue btn-sm"><i class="fa fa-globe"></i> Blue icon button small</a>
    </div>

    <div class="flex space-x-2 items-center my-2">
      <a href="" class="btn btn-disabled">Disabled button</a>
      <a href="" class="btn btn-disabled"><i class="fa fa-spin fa-spinner"></i> Loading</a>
      <a href="" class="btn btn-disabled btn-sm">Disabled button small</a>
      <a href="" class="btn btn-disabled btn-sm"><i class="fa fa-globe"></i> Disabled icon button small</a>
    </div>

    <div class="flex space-x-2 items-center my-2">
      <a href="" class="btn">Default button</a>
      <a href="" class="btn"><i class="fa fa-edit"></i> Default icon button</a>
      <a href="" class="btn btn-sm">Default button small</a>
      <a href="" class="btn btn-sm"><i class="fa fa-globe"></i> Default icon button small</a>
    </div>

    <div class="flex space-x-2 items-center my-2">
      <a href="" class="btn btn-clear">Clear button</a>
      <a href="" class="btn btn-clear"><i class="fa fa-edit"></i> Clear icon button</a>
      <a href="" class="btn btn-clear btn-sm">Clear button small</a>
      <a href="" class="btn btn-clear btn-sm"><i class="fa fa-globe"></i> Clear icon button small</a>
    </div>

    <div class="flex space-x-2 items-center my-2">
      <a href="" class="btn btn-red">Red button</a>
      <a href="" class="btn btn-red"><i class="fa fa-edit"></i> Red icon button</a>
      <a href="" class="btn btn-red btn-sm">Red button small</a>
      <a href="" class="btn btn-red btn-sm"><i class="fa fa-globe"></i> Red icon button small</a>
    </div>

    <div class="flex space-x-2 items-center my-2">
      <a href="" class="btn btn-yellow">Yellow button</a>
      <a href="" class="btn btn-yellow"><i class="fa fa-edit"></i> Yellow icon button</a>
      <a href="" class="btn btn-yellow btn-sm">Yellow button small</a>
      <a href="" class="btn btn-yellow btn-sm"><i class="fa fa-globe"></i> Yellow icon button small</a>
    </div>

    <hr class="my-4">

    <h1>Tags</h1>

    <div class="flex space-x-2 items-center my-2">
      <span class="tag">Default tag</span>
      <span class="tag tag-gray">Gray tag</span>
      <span class="tag tag-red">Red tag</span>
      <span class="tag tag-green">Green tag</span>
      <span class="tag tag-yellow">Yellow tag</span>
    </div>

    <hr class="my-4">

    <h1>Form</h1>

    <div class="my-2">
      <div class="pt-2 relative text-gray-600">
        <input
            class="border-2 w-64 border-gray-300 h-10 bg-white px-2 pl-10 rounded-lg text-sm focus:outline-none"
            type="search"
            name="search"
            placeholder="Search"
        />
        <button type="submit" class="absolute left-0 top-0 mt-4 ml-4">
          <i class="fas fa-search"></i>
        </button>
      </div>
    </div>

    <div class="my-2">
      TBA
    </div>

    <hr class="my-4">

    <h1>Modal</h1>

    <div class="my-2">
      TBA
    </div>

    <hr class="my-4">

    <h1>Tooltip</h1>

    <div class="my-2">
      TBA
    </div>


  </div>
</template>