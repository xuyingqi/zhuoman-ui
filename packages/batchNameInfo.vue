<template>
    <div>
        <div class="inner-span-names" @click="openDialog">
            {{showNames}}
        </div>
        <!-- 搜索作品名字模态框-->
        <el-dialog :visible.sync="showBatchDialog" :close-on-click-modal="false" :before-close="closeDialog"
            class="custom-dialog batch-dialog" :width="modelW">
            <div slot="title">
                <span class="batch-title">请输入{{title}} </span>
                <span class="tips">({{title}}通过回车或者逗号分割)</span>
            </div>
            <div class="theme-codes-area">
                <el-input v-model="themeCodes" type="textarea" />
            </div>
            <el-row class="mt10">
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <span class="limit-num">{{ arrLength }} / {{ maxNum }}</span>
                    <span v-show="isShowWarn" class="tips">(输入条数不能超过200条)</span>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="text-right">
                    <el-button size="small" @click="closeDialog">取消</el-button>
                    <el-button size="small" type="primary" @click="getThemeCodes">确认</el-button>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>
<script>
/**
 * 批量输入作品名称或者作品编号组件
 * 使用示例 <batch-name-info v-model="searchForm.artworkNames" title="作品名称" @change="openEnterEvent"/>
 * 引入   import batchNameInfo from "@/components/batchNameInfo";
 * */
import { isStrEmpty, isArrayEmpty } from "./utils/validate";

export default {
    name: "batchNameInfo",
    props: {
        title: {
            type: String,
            default: '作品名称'
        },
        value: {
            type: Array,
            default: () => []
        },
        modelW: {
            type: String,
            default: '500px'
        },
        checkNum: { // 数字校验 用于素材库-授权文件库 素材Id批量
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            showNames: "", // 页面上input框显示的文本
            batchNames: [],
            themeCodes: "", // 文本域中展示的文字
            arrLength: 0, // 当前批量个数
            maxNum: 200, // 最大批量个数
            isShowWarn: false,
            showBatchDialog: false,
            isPass: true // 是否通过校验
        };
    },
    watch: {
        value: {
            handler(newVal, oldVal) {
                if (isStrEmpty(newVal)) {
                    return
                }
                let str = newVal.toString()
                this.showNames = str.substring(0, 50)
            },
            immediate: true,
        },
        themeCodes(val) {
            if (!isStrEmpty(val)) {
                const arr = this.strToArr(val);
                this.arrLength = arr.length;
                this.isShowWarn = this.arrLength > this.totalNum;
            } else {
                this.arrLength = 0;
                this.isShowWarn = false;
            }
        },
        // 传给父组件的数组值
        batchNames(val) {
            if (!this.isPass) return false;
            this.$emit('input', val)
            this.$emit('change', val)
        },
    },
    methods: {
        /**
         * 显示填写作品名称模态框
         */
        openDialog() {
            this.showBatchDialog = true
            if (!isArrayEmpty(this.value)) {
                let str = ''
                this.value.forEach(item => {
                    str += item + '\n'
                })
                this.themeCodes = str
                return
            }
            this.themeCodes = ''
        },
        /**
         * 取消作品名称模态框
         */
        closeDialog() {
            this.showBatchDialog = false
        },

        /**
         * 获取作品名称
         */
        getThemeCodes() {
            // 输入批量名称超过最大限制
            if (this.isShowWarn) {
                this.$message.warning('输入条数不能超过200条')
                return false;
            }
            this.batchNames = this.strToArr(this.themeCodes)
            // 若checkNum为true，则校验输入是否为数字
            if (this.checkNum) {
                this.isPass = true
                let len = this.batchNames.length
                for (let i = 0; i < len; i++) {
                    if (!(/^[0-9]*$/.test(this.batchNames[i] - 0)) || this.batchNames[i].indexOf(".") > 0) {
                        this.isPass = false;
                        break;
                    }
                }
                if (!this.isPass) {
                    this.$message.warning(`${this.title}只能输入数字`)
                    return false
                }
            }
            this.showBatchDialog = false
        },
        /**
       * 字符串转换成数组
       */
        strToArr(str) {
            str = str.replace(/['|"]/gi, "")
            let list = str.split(/[,|，|\n]/);
            for (let i = list.length - 1; i >= 0; i--) {
                list[i] = this.trim(list[i])
                if (isStrEmpty(list[i])) {
                    list.splice(i, 1)
                }
            }
            return list;
        },
        trim(s) {
            return s.replace(/(^\s*)|(\s*$)/g, "");
        }
    }
};
</script>
<style lang="scss">
.batch-dialog {
    .text-right {
        text-align: right;
    }
    .mt10 {
        margin-top: 10px;
    }
    .tips {
        font-size: 12px;
        color: #9f1804;
    }
    .batch-title {
        font-size: 18px;
    }
    .theme-codes-area {
        .el-textarea {
            .el-textarea__inner {
                height: 300px;
                min-height: 100px !important;
                max-height: 500px;
            }
        }
    }
    .limit-num {
        line-height: 36px;
    }
}
</style>
<style scoped lang="scss">
.inner-span-names {
    display: block;
    width: 100%;
    height: 33px;
    line-height: 30px;
    -webkit-appearance: none;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    font-size: inherit;
    padding: 0 15px;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
}
</style>
