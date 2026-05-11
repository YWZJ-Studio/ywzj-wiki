---
order: 2
---

# 动画上下文

**动画上下文** 是动画控制器和JS脚本与载具实体之间的桥梁。通过 `context` 对象获取载具状态、控制动画播放。

上下文类继承关系：

```
BaseAnimationContext
  └── EntityContext
        └── VehicleContext
              ├── WheeledVehicleContext  (轮式)
              ├── TrackedVehicleContext  (履带式)
              ├── FixedWingVehicleContext (固定翼)
              └── RotaryWingVehicleContext (旋翼机)
```

## 基础上下文 (BaseAnimationContext)

以下方法在所有载具类型上均可用。

### 参数系统

用于在动画控制器之间传递自定义数据：

| 方法 | 返回 | 说明 |
|:----|:----|:----|
| `context.setParameter(name, value)` | `void` | 设置参数（任意类型） |
| `context.getParameter(name)` | `Object` | 获取参数 |
| `context.setFloat(name, value)` | `void` | 设置浮点参数 |
| `context.getFloat(name, defaultValue)` | `float` | 获取浮点参数，不存在时返回默认值 |
| `context.setBool(name, value)` | `void` | 设置布尔参数 |
| `context.getBool(name, defaultValue)` | `boolean` | 获取布尔参数，不存在时返回默认值 |
| `context.setInt(name, value)` | `void` | 设置整数参数 |
| `context.getInt(name, defaultValue)` | `int` | 获取整数参数，不存在时返回默认值 |

### 动画访问

| 方法 | 返回 | 说明 |
|:----|:----|:----|
| `context.getAnimation(name)` | `BedrockAnimation` | 按名称获取动画 |
| `context.getAnimations()` | `Map` | 获取所有动画 |
| `context.getAnimationRunners()` | `AnimationRunnerHolder` | 获取动画运行器，用于程序化播放动画 |

### 事件系统

用于动画控制器中触发和监听事件：

| 方法 | 返回 | 说明 |
|:----|:----|:----|
| `context.hasEvent(event)` | `boolean` | 检查事件是否已触发 |
| `context.offerEvent(event)` | `void` | 触发一个事件 |
| `context.clearEvents()` | `void` | 清除所有事件 |

### 绑定值

`bone_binding` 节点使用的值来源，可覆盖以支持自定义绑定：

| 方法 | 返回 | 说明 |
|:----|:----|:----|
| `context.getBindingValue(source, param)` | `float` | 获取绑定值，source 为绑定源名称 |

内置的绑定源：
- `"wheel_rotation"` — 车轮旋转（轮式，param 为车轮半径）
- `"steering_angle"` — 转向角（轮式）
- `"left_wheel_rotation"` — 左履带驱动轮旋转（履带式，param 为驱动轮半径）
- `"right_wheel_rotation"` — 右履带驱动轮旋转（履带式，param 为驱动轮半径）

### 时间

| 方法 | 返回 | 说明 |
|:----|:----|:----|
| `context.getPartialTick()` | `float` | 当前帧的部分刻（0~1），用于平滑插值 |
| `context.currentTimeMillis()` | `long` | 当前系统时间（毫秒） |

## 载具上下文 (VehicleContext)

以下方法在所有载具类型上可用。

### 旋转

| 方法 | 返回 | 说明 |
|:----|:----|:----|
| `context.getXRot()` | `float` | 载具X轴旋转（俯仰） |
| `context.getYRot()` | `float` | 载具Y轴旋转（偏航） |
| `context.getZRot()` | `float` | 载具Z轴旋转（滚转） |

### 速度与功率

| 方法 | 返回 | 说明 |
|:----|:----|:----|
| `context.getSpeed()` | `double` | 当前速度 |
| `context.getPower()` | `float` | 发动机功率（0~1） |
| `context.getEngineSpeed()` | `float` | 发动机转速 |

### 部件

| 方法 | 返回 | 说明 |
|:----|:----|:----|
| `context.getPartXRot(id)` | `float` | 获取部件当前X轴旋转角度 |
| `context.getPartYRot(id)` | `float` | 获取部件当前Y轴旋转角度 |
| `context.hasOwner(id)` | `boolean` | 指定部件是否有操作者 |

::: warning
没有 `getPartZRot` 方法。Z轴旋转由部件内部控制，不暴露给动画上下文。
:::

### 武器

| 方法 | 返回 | 说明 |
|:----|:----|:----|
| `context.getWeaponRemainAmmo(partId, weaponIndex)` | `int` | 获取部件的第N个武器的剩余弹药数 |
| `context.getWeaponName(partId, weaponIndex)` | `String` | 获取部件的第N个武器的显示名称 |

### 操控

| 方法 | 返回 | 说明 |
|:----|:----|:----|
| `context.getControlUnit()` | `ControlUnit` | 获取操控单元，可读取玩家的键盘输入状态 |

### 其他

| 方法 | 返回 | 说明 |
|:----|:----|:----|
| `context.lastRenderTime()` | `long` | 上一次渲染的时间戳（毫秒） |

## ControlUnit

`ControlUnit` 是操控单元的公共字段，可通过 `context.getControlUnit()` 获取：

| 字段 | 类型 | 说明 |
|:----|:----|:----|
| `controlUnit.forward` | `boolean` | 前进键 |
| `controlUnit.backward` | `boolean` | 后退键 |
| `controlUnit.left` | `boolean` | 左转键 |
| `controlUnit.right` | `boolean` | 右转键 |
| `controlUnit.up` | `boolean` | 上升键 |
| `controlUnit.down` | `boolean` | 下降键 |
| `controlUnit.leftYaw` | `boolean` | 左偏航键 |
| `controlUnit.rightYaw` | `boolean` | 右偏航键 |
| `controlUnit.functionalUp` | `boolean` | 功能上键 |
| `controlUnit.functionalDown` | `boolean` | 功能下键 |
| `controlUnit.functionalLeft` | `boolean` | 功能左键 |
| `controlUnit.functionalRight` | `boolean` | 功能右键 |
| `controlUnit.xRot` | `float` | 瞄具X轴旋转值 |
| `controlUnit.xRotKeep` | `boolean` | X轴旋转保持 |
| `controlUnit.yRot` | `float` | 瞄具Y轴旋转值 |
| `controlUnit.yRotKeep` | `boolean` | Y轴旋转保持 |

```js
var controlUnit = context.getControlUnit();
if (controlUnit.forward) {
    // 玩家按下了前进键
}
```

## 类型专用上下文

### 轮式载具 (WheeledVehicleContext)

| 方法 | 返回 | 说明 |
|:----|:----|:----|
| `context.getForwardSpeed()` | `float` | 前进速度 |
| `context.getTurnAngle()` | `float` | 转向角 |
| `context.getSteeringAngle()` | `float` | 转向角度（原始值） |
| `context.getSteeringAngle(maxAngle)` | `float` | 转向角度（限制在 ±maxAngle 范围内） |
| `context.getWheelDegrees(radius)` | `float` | 指定半径的车轮旋转角度 |
| `context.getWheelRotation()` | `float` | 车轮旋转累计值 |

### 履带式载具 (TrackedVehicleContext)

| 方法 | 返回 | 说明 |
|:----|:----|:----|
| `context.getForwardSpeed()` | `float` | 前进速度 |
| `context.getTurnSpeed()` | `float` | 转向速度 |
| `context.getLeftWheelDegrees(radius)` | `float` | 指定半径的左驱动轮旋转角度 |
| `context.getRightWheelDegrees(radius)` | `float` | 指定半径的右驱动轮旋转角度 |
| `context.getTrackPose()` | `PoseHelper` | 获取履带动画的姿态构建器 |

### 固定翼载具 (FixedWingVehicleContext)

| 方法 | 返回 | 说明 |
|:----|:----|:----|
| `context.getThrottleLevel()` | `float` | 节流阀值（经插值） |
| `context.getPitchInput()` | `float` | 俯仰输入（经插值） |
| `context.getYawInput()` | `float` | 偏航输入（经插值） |
| `context.getRollInput()` | `float` | 滚转输入（经插值） |

### 旋翼机 (RotaryWingVehicleContext)

| 方法 | 返回 | 说明 |
|:----|:----|:----|
| `context.getCollectivePitch()` | `float` | 总距（经插值） |
| `context.getPitchInput()` | `float` | 俯仰输入（经插值） |
| `context.getRollInput()` | `float` | 滚转输入（经插值） |
