# 动画状态机
::: danger
当前由于实际应用场景的缺失，此功能欠缺详尽的测试，状态机的某些功能可能缺失/不完善或是存在问题，故当前版本不建议载具包作者使用状态机  

介于编写json太过复杂，我们计划在未来推出图形化的编辑工具
:::

**动画状态机**是一种类似流程图的工具，用于控制动画的播放和切换。它由多个**状态**组成，状态之间可以通过**转换**进行切换，从而实现复杂的动画逻辑。

一个动画控制器可以包含多个并行运行的状态机，每个状态机独立输出一个姿态，最终通过混合控制器组合成最终应用到模型上的姿态。

## 定义状态机

在动画控制器配置中，通过 `state_machines` 字段定义状态机：

```json
{
  // ..
  "state_machines": {
    "main": {
      "name": "main",
      "start_state": "idle",
      "states": {
        // 状态定义...
      }
    }
  }
  // ..
}
```

- `name`: 状态机名称（无实际功能，起标识作用）
- `start_state`: 起始状态的名称，状态机初始化时会进入该状态
- `states`: 状态定义的映射表

## 状态（State）

**状态**是状态机的基本单元，代表对象的某个阶段或模式。每个状态可以：
- 输出一个姿态（通过 `evaluate` 配置）
- 定义一系列状态事件（进入、更新、退出时执行的动作）
- 定义一系列转换条件（何时切换到其他状态）

### 状态定义

```json
{
  "states": {
    "idle": {
      "on_enter": [
        // 进入状态时执行的动作列表
      ],
      "on_update": [
        // 每帧更新时执行的动作列表
      ],
      "on_exit": [
        // 退出状态时执行的动作列表
      ],
      "transitions": [
        // 转换定义
      ],
      "evaluate": {
        // 姿态计算配置
      }
    }
  }
}
```

### 状态事件

每个状态状态提供三个事件，可以在特定时机执行动作，动作列表中的动作会在触发后按顺序依次执行，这些事件配置均是可选的  
关于可执行的动作，参见[动作](#动作action)

#### on_enter
当状态机进入该状态时执行一次，常用于：
- 播放进入动画
- 设置参数初始值
- 播放音效

#### on_update
每帧更新时执行，常用于：
- 更新动画参数
- 执行持续性的逻辑

#### on_exit
当状态机离开该状态时执行一次，常用于：
- 清理状态
- 重置参数

### 姿态计算（Evaluate）

`evaluate` 配置决定该状态如何输出姿态，支持两种方式：

#### 轨道模式（Track）
从指定的动画轨道获取姿态，这是最常用的方式：

```json
{
  "evaluate": {
    "type": "track",
    "track": "main"
  }
}
```

轨道名称通常与状态机名称相同，表示该状态机在混合控制器中的输出通道。

#### 脚本模式（Script）
通过 JavaScript 脚本动态计算姿态：

```json
{
  "evaluate": {
    "type": "script",
    "script": "return context.getAnimationRunners().getPose('idle');"
  }
}
```

::: warning
脚本模式的性能开销较大，建议优先使用轨道模式
:::

## 转换（Transition）

**转换**定义了状态之间的切换规则。当转换的条件满足时，状态机会从当前状态切换到目标状态。

### 转换定义

```json
{
  "transitions": [
    {
      // 目标状态的名称
      "target": "moving",
      // 转换条件，决定何时触发转换
      "condition": {
        "type": "script",
        "script": "context.getPower() > 0"
      },
      // 转换时长（秒），在此期间会混合源状态和目标状态的姿态
      "duration": 0.2,
      // 混合曲线类型，控制转换的过渡效果
      "blend_curve": "linear"
    }
  ]
}
```

### 转换条件（Condition）

条件用于判断是否应该触发转换，支持多种类型：

#### 脚本条件
通过 JavaScript 表达式判断：

```json
{
  "type": "script",
  "script": "context.getPower() > 0.1"
}
```

#### 逻辑与（AND）
所有子条件都满足时才触发：

```json
{
  "type": "and",
  "conditions": [
    {"type": "script", "script": "context.getSpeed() > 0"},
    {"type": "script", "script": "context.isOnGround()"}
  ]
}
```

#### 逻辑或（OR）
任一子条件满足时触发：

```json
{
  "type": "or",
  "conditions": [
    {"type": "script", "script": "context.getSpeed() > 0"},
    {"type": "script", "script": "context.isOnGround()"}
  ]
}
```

#### 逻辑非（NOT）
条件不满足时触发：

```json
{
  "type": "not",
  "condition": {
    "type": "script",
    "script": "context.isOnGround()"
  }
}
```

### 转换事件
转换触发时，也可以执行一些动作，写法与[状态事件](#状态事件)相同  
关于可执行的动作，参见[动作](#动作action)
```json
{
  "transitions": [
    {
      "target": "moving",
      "condition": {
        "type": "script",
        "script": "context.getSpeed() > 0"
      },
      "after_trigger": [
        {
          "type": "play_sound",
          "sound": "vehicle.gear.shift"
        }
      ]
    }
  ]
}
```

### 混合曲线
::: danger
此功能暂未实现，目前默认线性过渡
:::
转换过程中的姿态混合可以使用不同的曲线类型，影响过渡的视觉效果：

- `linear`: 线性过渡
- `ease_in`: 缓入
- `ease_out`: 缓出
- `ease_in_out`: 缓入缓出

## 动作（Action）

事件触发后可执行的动作。以下是可选的动作类型：

#### 播放动画
```json
{
  "type": "play_animation",
  "animation": "idle",
  "speed": 1.0,
  "loop": true
}
```

#### 设置变量
```json
{
  "type": "set_variable",
  "variable": "speed",
  "value": 0
}
```

#### 播放音效
```json
{
  "type": "play_sound",
  "sound": "vehicle.engine.start"
}
```

#### 执行脚本
```json
{
  "type": "script",
  "script": "context.setSpeed(0);"
}
```