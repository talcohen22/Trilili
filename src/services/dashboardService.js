export const dashboardService={
    countTasksByLabels,
    calculateTaskStatus,
    getTasksWithDueDate
}


function countTasksByLabels(board) {
    const labelsMap = new Map();
  
    board.groups.forEach((group) => {
      group.tasks.forEach((task) => {
        task.labelIds.forEach((labelId) => {
          if (!labelsMap.has(labelId)) {
            const label = board.labels.find((l) => l.id === labelId)
            if (label) {
              labelsMap.set(labelId, {
                label,
                count: 1,
              });
            }
          } else {
            labelsMap.get(labelId).count += 1;
          }
        });
      });
    });
  
    const tasksByLabels = {
      labels: Array.from(labelsMap.values()).map((item) => item.label),
      taskCounts: Array.from(labelsMap.values()).map((item) => item.count),
    };
  
    return tasksByLabels
  }


  function calculateTaskStatus(board) {
    let doneCount = 0;
    let undoneCount = 0;
  
    board.groups.forEach((group) => {
      group.tasks.forEach((task) => {
        const hasDueDate = task.dueDate && task.dueDate.isDone;
        const hasChecklists = task.checklists && task.checklists.length > 0;
  
        if ((hasDueDate || hasChecklists) && !(hasChecklists && !task.checklists.every((checklist) => checklist.isDone))) {
          doneCount++;
        } else {
          undoneCount++;
        }
      });
    });
  
    const totalTasks = doneCount + undoneCount;
    const donePercentage = (doneCount / totalTasks) * 100;
    const undonePercentage = (undoneCount / totalTasks) * 100;
    
    return {
      done: {
        count: doneCount,
        percentage: donePercentage,
      },
      undone: {
        count: undoneCount,
        percentage: undonePercentage,
      },
    };
  }
  
  function getTasksWithDueDate(board) {
    const currentDate = Date.now();
    const tasksWithDueDate = [];
  
    board.groups.forEach((group) => {
      group.tasks.forEach((task,index) => {
        if (task.dueDate && !task.dueDate.isDone) {
          const dueDateTimestamp = task.dueDate.timeStamp;
          const timeDifference = Math.abs(dueDateTimestamp-currentDate)
          console.log(dueDateTimestamp)
          console.log(currentDate)
          console.log(timeDifference)
          console.log('timedifference '+index,timeDifference)
          let daysLeft=0
          if(timeDifference>0){
           daysLeft =Math.max(0, Math.ceil((timeDifference) / (24 * 60 * 60 * 1000)))
          }
        //   const daysLeft = dueDateTimestamp > currentDate ? Math.max(0, Math.ceil((dueDateTimestamp - currentDate) / (24 * 60 * 60 * 1000))) : 0;
        console.log('daysLeft '+index+':',timeDifference)

          tasksWithDueDate.push({
            title: task.title,
            memberIds: task.memberIds,
            daysLeft,
            beyondDueDate: daysLeft === 0 && dueDateTimestamp < currentDate,
          });
        }
      });
    });
  
    return tasksWithDueDate
  }
  