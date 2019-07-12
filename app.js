
firebase.auth().onAuthStateChanged(function(user) {
  document.querySelector('#cardForm').style.display = 'block';
  if (user) {
    var div = document.createElement('div');
    div.id = 'logoutButton';
    div.className = 'text-center';
    div.innerHTML = `
      <button onclick="logOut()" class="btn btn-danger btn-sm text-center">ออกจากระบบ</button>
    `
    document.querySelector('#cardForm').style.display = 'none'
    document.querySelector('#main').appendChild(div);
  
  } else {
    loginForm();
  }
})

function logOut() {
    firebase.auth().signOut().then(() => {
      document.querySelector('#logoutButton').remove();
    })
}
function registerForm() {
  var form = document.querySelector('#form');
  form.innerHTML = '';
  var formLogin = document.createElement('div');
    formLogin.innerHTML = `
     <h4 class="text-center">Register</h4>
      <form id="userRegisterForm">
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" class="form-control" type="email" placeholder="Email" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input id="password" class="form-control" minlength="6" type="password" placeholder="password" required>
        </div>
        <div class="form-group">
          <label for="passwordConfirm">Confirm Password</label>
          <input id="passwordConfirm" minlength="6" class="form-control" type="password" placeholder="Confirm password" required>
        </div>
        <a onclick="loginForm()" href="javascript:void(0)">เป็นสมาชิกแล้ว?</a>
        <button id="registerButton" class="btn btn-primary float-right">สมัครสมาชิก</button>
      </form>
    `
    form.appendChild(formLogin);
   
    document.querySelector('#userRegisterForm').addEventListener('submit', e => {
      e.preventDefault();
      var email = document.querySelector('#email').value;
      var password = document.querySelector('#password').value;
      var passwordConfirm = document.querySelector('#passwordConfirm').value;
      
      if (passwordConfirm !== password) {
        alert('รหัสผ่านไม่ตรงกัน');
      } else {
        firebaseRegister(email, passwordConfirm);
      }
  });
}

function loginForm() {
  var form = document.querySelector('#form');
  form.innerHTML = '';
  var formLogin = document.createElement('div');
  formLogin.innerHTML = `
   <h4 class="text-center">Login</h4>
    <form id="userLoginForm">
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" class="form-control" type="email" placeholder="Email" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" class="form-control" type="password" placeholder="password" required>
      </div>
      <a onclick="registerForm()" href="javascript:void(0)">ยังไม่ได้เป็นสมาชิก?</a>
      <button id="loginButton" class="btn btn-primary float-right">เข้าสู่ระบบ</button>
    </form>
  `
  form.appendChild(formLogin);
  document.querySelector('#userLoginForm').addEventListener('submit', e => {
    e.preventDefault();
    var email = document.querySelector('#email').value;
    var password = document.querySelector('#password').value;
    firebaseLogin(email, password);
})
}


function firebaseRegister(email , password) {
  document.querySelector('#registerButton').innerHTML = 'รอสักครู่..';
  firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {
    console.log(user.user)
  }).catch(e => {
    document.querySelector('#registerButton').innerHTML = 'สมัครสมาชิก';
    if (e.code === 'auth/email-already-in-use') {
      alert('มีอีเมลนี้ในระบบแล้ว');
    }
  });
}

function firebaseLogin(email, password) {
  document.querySelector('#loginButton').innerHTML = 'รอสักครู่..';
  firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
    console.log(user.user);
  }).catch(e => {
    document.querySelector('#loginButton').innerHTML = 'เข้าสู่ระบบ';
    if (e.code === 'auth/user-not-found') {
      alert('ไม่มีอีเมลนี้ในระบบ');
    }
    if (e.code === 'auth/wrong-password') {
      alert('รหัสผ่านไม่ถูกต้อง');
    }
  })
}