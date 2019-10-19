<template>
  <div class="management">
    <header>
      <h1>孔夫子旧书网后台管理系统</h1>
      <div class="right">
        <ul class="ul1">
          <li>
            <el-dropdown show-timeout="1">
              <span class="el-dropdown-link text el-icon-user-solid">欢迎你,{{user}}</span>
            </el-dropdown>
          </li>
          <li>
            <span @click="exit">退出系统</span>
          </li>
        </ul>
      </div>
    </header>

    <main @click="change()">
      <el-tabs tabPosition="left" @tab-click="handleClick" :value="item">
        <!-- 用户管理 -->
        <el-tab-pane label="用户管理" name="0">
          <div class="content">
            <el-row style="display:flex;">
              <el-input
                v-model="inputSearch"
                placeholder="搜索用户"
                style="max-width:280px"
                prefix-icon="el-icon-search"
                :clearable="true"
              ></el-input>

              <el-button type="success" @click="search">搜索用户</el-button>

              <el-button type="success" @click="addUser()">添加新用户</el-button>
            </el-row>

            <el-table
              :data="userData"
              style="width: 100%"
              height="500px"
              @selection-change="handleSelectionChange"
              ref="multipleTable"
              tooltip-effect="dark"
            >
              <el-table-column type="selection" width="55"></el-table-column>

              <el-table-column label="创建日期" width="180">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{scope.row.regtime}}</span>
                </template>
              </el-table-column>

              <el-table-column label="用户手机号码" width="180">
                <template slot-scope="scope">
                  <input
                    ref="haoma"
                    v-model="scope.row.username"
                    style="border:none;background-color: white"
                    :disabled="scope.row.nameWrite == 1"
                  />
                </template>
              </el-table-column>

              <el-table-column label="密码" width="180" type="index">
                <template slot-scope="scope">
                  <input
                    style="border:none;background-color: white;"
                    ref="mima"
                    v-model="scope.row.password"
                    :disabled="scope.row.passwordWrite == 1"
                  />
                </template>
              </el-table-column>

              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row.id)">修改密码</el-button>

                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button>

                  <el-button
                    size="mini"
                    type="success"
                    @click="handleSubmit(scope.$index, scope.row)"
                  >提交</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>

        <!-- 商品管理 -->
        <el-tab-pane label="商品管理" @click="change" name="1">
          <el-row style="display:flex;margin:20px 0 10px 0;">
            <el-input
              placeholder="搜索用户"
              v-model="inputSearch"
              style="max-width:280px"
              prefix-icon="el-icon-search"
              :clearable="true"
            ></el-input>
            <el-button type="success">搜索用户</el-button>
            <el-button type="success" @click="addgoods()">添加新用户</el-button>
          </el-row>
          <el-table :data="goodsData" style="width: 90%;" height="600">
            <el-table-column fixed prop="dateli" label="日期" width="150">
              <template slot-scope="scope">
                <input
                  :disabled="scope.row.disalber"
                  style="border:none;background-color: white;"
                  ref="mima"
                  v-model="scope.row.dateli"
                />
              </template>
            </el-table-column>
            <el-table-column prop="_id" label="id" width="120">
              <template slot-scope="scope">
                <input
                  placeholder="ID自动生成"
                  disabled="true"
                  style="border:none;background-color: white;"
                  ref="mima"
                  v-model="scope.row._id"
                />
              </template>
            </el-table-column>
            <el-table-column prop="title" label="产品名称" width="120">
              <template slot-scope="scope">
                <input
                  :disabled="scope.row.disalber"
                  style="border:none;background-color: white;"
                  ref="mima"
                  v-model="scope.row.title"
                />
              </template>
            </el-table-column>
            <el-table-column prop="action1" label="店铺名" width="120">
              <template slot-scope="scope">
                <input
                  :disabled="scope.row.disalber"
                  style="border:none;background-color: white;"
                  ref="mima"
                  v-model="scope.row.action1"
                />
              </template>
            </el-table-column>
            <el-table-column prop="imgsrc" label="图片" width="200">
              <template slot-scope="scope">
                <img :src="scope.row.imgsrc" alt style="width:70px;height:100px;" />
                <input
                  :disabled="scope.row.disalber"
                  style="border:none;background-color: white;"
                  ref="mima"
                  v-model="scope.row.imgsrc"
                />
              </template>
            </el-table-column>
            <el-table-column prop="action2" label="星级" width="120">
              <template slot-scope="scope">
                <input
                  :disabled="scope.row.disalber"
                  style="border:none;background-color: white;"
                  ref="mima"
                  v-model="scope.row.action2"
                />
              </template>
            </el-table-column>
            <el-table-column prop="prite" label="价格" width="120">
              <template slot-scope="scope">
                <input
                  :disabled="scope.row.disalber"
                  style="border:none;background-color: white;"
                  ref="mima"
                  v-model="scope.row.prite"
                />
              </template>
            </el-table-column>
            <el-table-column prop="goods_kucun" label="库存" width="120">
              <template slot-scope="scope">
                <input
                  :disabled="scope.row.disalber"
                  style="border:none;background-color: white;"
                  ref="mima"
                  v-model="scope.row.goods_kucun"
                />
              </template>
            </el-table-column>
            <el-table-column prop="action0" label="品级" width="120">
              <template slot-scope="scope">
                <input
                  :disabled="scope.row.disalber"
                  style="border:none;background-color: white;"
                  ref="mima"
                  v-model="scope.row.action0"
                />
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click.native="handit(scope.$index,scope.row)"
                >修改</el-button>
                <el-button
                  type="text"
                  size="small"
                  @click.native.prevent="deleteow(scope.$index, goodsData)"
                >删除</el-button>
                <el-button
                  type="text"
                  size="small"
                  @click.native="handitald(scope.$index,scope.row)"
                >提交</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <!-- 订单管理 -->
        <el-tab-pane label="订单管理" name="2">
          <div class="content">
            <el-row style="display:flex;">
              <el-input
                placeholder="搜索订单"
                v-model="inputSearch"
                style="max-width:280px"
                prefix-icon="el-icon-search"
              ></el-input>

              <el-button type="success">搜索订单</el-button>

              <el-button type="success" @click="addUser()">添加新订单</el-button>
            </el-row>

            <el-table
              :data="orderData"
              style="width: 100%"
              height="500px"
              @selection-change="handleSelectionChange"
              ref="multipleTable"
              tooltip-effect="dark"
            >
              <el-table-column type="selection" width="55"></el-table-column>

              <el-table-column label="创建日期" width="180">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
              </el-table-column>

              <el-table-column label="订单ID" width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.orderID }}</span>
                </template>
              </el-table-column>

              <el-table-column label="用户" width="180">
                <template slot-scope="scope">
                  <i class="el-icon-user"></i>
                  <span style="margin-left: 10px" contenteditable="false">{{ scope.row.orderUser }}</span>
                </template>
              </el-table-column>

              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>

                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button>

                  <el-button
                    size="mini"
                    type="success"
                    @click="handleSubmit(scope.$index, scope.row)"
                  >提交</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      item: "d",
      inputSearch: "",
      user: "",
      newMessageNumber: 1,
      inboxNumber: 2,
      userData: "",
      addOrAlter: "",
      goodsData: [
        {
          dateli: "",
          _id: "",
          title: "",
          imgsrc: "",
          prite: "",
          goods_kucun: "",
          action2: "",
          action0: "",
          action1: "",
          disalber: "true"
        }
      ],
      orderData: [
        {
          date: "2016/05/02",
          orderID: "007",
          orderUser: "13642309535"
        }
      ],
      inputSearch: "",
      multipleSelection: []
    };
  },
  computed: {
    myMessageNumber: function() {
      let myMessageNumber = this.newMessageNumber + this.inboxNumber;
      return myMessageNumber;
    }
  },

  components: {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    change() {
      if (event.target.innerHTML == "用户管理") {
        document.cookie = "0";
      } else if (event.target.innerHTML == "商品管理") {
        document.cookie = "1";
      } else if (event.target.innerHTML == "订单管理") {
        document.cookie = "2";
      }
      console.log(document.cookie);
    },

    handitald(index, row) {
      let {
        dateli,
        _id,
        title,
        imgsrc,
        prite,
        goods_kucun,
        action2,
        action0,
        action1
      } = row;

      let disalber = "true";

      this.$axios.post("http://127.0.0.1:1906/goodsgl/addgoods", {
        dateli,
        _id,
        title,
        imgsrc,
        prite,
        goods_kucun,
        action2,
        action0,
        action1,
        disalber
      });
      alert("修改成功!!!");
    },
    handit(index) {
      this.goodsData[index].disalber = false;
    },
    deleteow(index, rows) {
      let da = rows.splice(index, 1);
      da.forEach(element => {
        let { _id } = element;
        this.$axios.post("http://127.0.0.1:1906/goodsgl/deletegoods", {
          _id: _id
        });
      });
      alert("删除成功!!!");
    },
    exit() {
      this.$router.replace({
        path: "/"
      });
    },

    // 查询用户
    async search() {
      console.log(this.inputSearch);

      let { data } = await this.$axios.get(
        "http://127.0.0.1:1906/user/search",
        {
          params: { username: this.inputSearch }
        }
      );
      this.userData = data;
    },
    handleEdit(index, id) {
      this.userData[index].passwordWrite = 0;
      this.addOrAlter = "alter";
    },

    // 删除用户
    async handleDelete(index, row) {
      let username = this.userData[index].username;
      console.log(username);

      let result = await this.$axios.post("http://127.0.0.1:1906/user/delete", {
        username
      });
      this.userData.splice(index, 1);
    },

    //添加新用户
    addUser() {
      this.addOrAlter = "add";
      this.userData.push({
        regtime: new Date().toLocaleDateString(),
        nameWrite: "0",
        passwordWrite: "0"
      });
    },

    // 提交
    async handleSubmit(index, id) {
      // console.log(this.$refs.haoma.value);

      this.userData[index].nameWrite = 1;
      this.userData[index].passwordWrite = 1;
      console.log(this.userData[index]);

      if (this.addOrAlter == "add") {
        // 添加用户时的提交
        let username = this.$refs.haoma.value;
        let password = this.$refs.mima.value;
        console.log(username, password);

        // this.userData[index].passwordWrite = false;
        // this.userData[index].namewordWrite = false;

        let result = await this.$axios.post("http://127.0.0.1:1906/user/add", {
          username,
          password
        });
        console.log(result);

        let { data } = result;
        if (data.code == 0) {
          alert("用户已存在");
        } else {
          alert("添加成功");
        }
      } else {
        // 修改密码时的提交

        let { username, password } = this.userData[index];
        console.log(username, password);

        let result = await this.$axios.post(
          "http://127.0.0.1:1906/user/alter",
          {
            username,
            password
          }
        );
        console.log(result);

        let { data } = result;
        if (data.code == 0) {
          alert("修改失败");
        } else {
          alert("修改成功");
        }
      }
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    addgoods() {
      this.goodsData.push({
        dateli: new Date().toLocaleDateString(),
        _id: "",
        title: "",
        imgsrc: "",
        prite: "",
        goods_kucun: "",
        action2: "",
        action0: "",
        action1: "",
        disalber: "true"
      });
    }
  },
  async created() {
    let { data: dada } = await this.$axios.get(
      "http://127.0.0.1:1906/goodsgl/"
    );
    this.goodsData = dada;
    console.log(dada);

    let { data } = await this.$axios.get("http://127.0.0.1:1906/user");
    this.userData = data;
    this.user = this.$route.query.username;
    console.log(this.item);
    this.item = document.cookie;
  }
};
</script>
<style lang="scss" scoped>
.management {
  // height: 100%;
}
header {
  height: 50px;
  background-color: #1f262d;
  display: flex;
  // justify-content: space-around;
  align-items: center;
  color: #cccccc;

  h1 {
    padding-left: 20px;
    line-height: 36px;
    font-size: 20px;
    font-weight: bold;
    color: #a4d3ee;
  }
  .right {
    height: 100%;
    display: flex;
    margin-left: 14px;

    .ul1 {
      margin-right: 25px;
      display: flex;
      font-size: 14px;
      li {
        position: relative;
        cursor: pointer;
        padding: 0 10px;
        display: flex;
        align-items: center;
        .message {
          padding: 0 4px;
          background-color: red;
          color: white;
          // font-size: 12px;
          margin-left: 3px;
        }
        span {
          color: white;
        }
      }
      li:hover {
        background-color: green;
        color: yellow;
      }
    }
    .search {
      display: flex;
      align-items: center;
      input {
        background-color: #47515b;
        color: #fff;
        height: 28px;
        padding: 4px 10px 5px;
        border: 0;
        width: 200px;
      }
      input::-webkit-input-placeholder,
      textarea::-webkit-input-placeholder {
        /* WebKit browsers */
        color: yellowgreen;
      }
    }
  }
}
main {
  height: 600px;
  .content {
    padding-top: 10px;
    padding-left: 10px;
  }
}
</style>