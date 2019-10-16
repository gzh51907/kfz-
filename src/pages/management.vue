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
            <span>退出系统</span>
          </li>
        </ul>
      </div>
    </header>

    <main>
      <el-tabs tabPosition="left">
        <!-- 用户管理 -->
        <el-tab-pane label="用户管理">
          <div class="content">
            <el-row style="display:flex;">
              <el-input
                placeholder="搜索用户"
                v-model="inputSearch"
                style="max-width:280px"
                prefix-icon="el-icon-search"
                :clearable="true"
              ></el-input>

              <el-button type="success">搜索用户</el-button>

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
                  <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
              </el-table-column>

              <el-table-column label="用户手机号码" width="180">
                <template slot-scope="scope">
                  <p :contenteditable="scope.row.nameWrite">{{ scope.row.name }}</p>
                </template>
              </el-table-column>

              <el-table-column label="密码" width="180" type="index">
                <template slot-scope="scope">
                  <p
                    style="border:none"
                    :value="scope.row.password"
                    :contenteditable="scope.row.passwordWrite"
                  >{{scope.row.password}}</p>
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
        <el-tab-pane label="商品管理">
          <div class="content">
            <el-row style="display:flex;">
              <el-input
                placeholder="搜索商品"
                v-model="inputSearch"
                style="max-width:280px"
                prefix-icon="el-icon-search"
              ></el-input>

              <el-button type="success">搜索商品</el-button>

              <el-button type="success" @click="addUser()">添加新商品</el-button>
            </el-row>

            <el-table
              :data="goodsData"
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

              <el-table-column label="商品ID" width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.goodsID }}</span>
                </template>
              </el-table-column>

              <el-table-column label="商品名称" width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px" contenteditable="false">{{ scope.row.goodsName }}</span>
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

        <!-- 订单管理 -->
        <el-tab-pane label="订单管理">
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
      user: "大王",
      newMessageNumber: 1,
      inboxNumber: 2,
      userData: [
        {
          date: "2016/05/02",
          name: "1364230953",
          password: 1234,
          id: 0,
          passwordWrite: "false",
          nameWrite: "false"
        },
        {
          date: "2016/05/03",
          name: "13642309536",
          password: 12345,
          passwordWrite: "false",
          id: 1,
          nameWrite: "false"
        }
      ],
      goodsData: [
        {
          date: "2016/05/02",
          goodsID: "1",
          goodsName: "意大利炮"
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
    handleEdit(index, id) {
      this.userData[index].passwordWrite = true;
    },
    handleDelete(index, row) {
      this.userData.splice(index, 1);
      console.log(this.userData);
    },
    addUser() {
      this.userData.push({
        date: new Date().toLocaleDateString(),
        nameWrite: "true",
        passwordWrite: "true"
      });
    },
    handleSubmit(index, id) {
      this.userData[index].passwordWrite = false;
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
    }
  }
};
</script>
<style lang="scss" scoped>
.management {
  height: 100%;
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