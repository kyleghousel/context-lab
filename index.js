/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const createEmployeeRecord = (array) => {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

const createEmployeeRecords = (array) => {
  const employeeRecords = []

  array.forEach(employee => employeeRecords.push(createEmployeeRecord(employee)))

  return employeeRecords
}

const createTimeInEvent = function (dateStamp) {

  const stamp = {
    type: "TimeIn",
    hour: Number(dateStamp.slice(11,15)),
    date: dateStamp.slice(0, 10)
  }

  this.timeInEvents.push(stamp)

  return this
}

const createTimeOutEvent = function (dateStamp) {

  const stamp = {
    type: "TimeOut",
    hour: Number(dateStamp.slice(11,15)),
    date: dateStamp.slice(0, 10)
  }

  this.timeOutEvents.push(stamp)

  return this
}

const hoursWorkedOnDate = function (formDate) {
  const timeIn = this.timeInEvents.find(e => e.date === formDate)
  const timeOut = this.timeOutEvents.find(e => e.date === formDate)

  if (!timeIn || !timeOut) {
    throw new Error(`Missing timeIn or timeOut for date ${formDate}`);
  }

  return (timeOut.hour - timeIn.hour) / 100
}

const wagesEarnedOnDate = function (formDate) {
  const hoursWorked = hoursWorkedOnDate.call(this, formDate)

  return hoursWorked * this.payPerHour
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const findEmployeeByFirstName = function (employeeRecords, firstName) {
    return employeeRecords.find(employee => employee.firstName === firstName)
}

const calculatePayroll = function (employeeRecords) {

  return employeeRecords.reduce((acc, employee) => acc += allWagesFor.call(employee), 0)

}
